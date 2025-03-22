import { BadRequestException, ConflictException, Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { BadRequestMessage, ConflictMessage, NotFoundMessage, PublicMessage, SupplierStatus } from 'src/common/enums/message.enum';
import { SupplementaryInfoDto, SupplierSignDto } from '../dto/supplier.dto';
import { SupplierOTPEntity } from '../entities/supplier-otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/modules/category/services/category.service';
import { SupplierEntity } from '../entities/supplier.entity';
import { TTokenPayload } from 'src/modules/auth/types/payload';
import { CheckOtpDto } from 'src/modules/auth/dto/otp.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity) private supplierRepository: Repository<SupplierEntity>,
    @InjectRepository(SupplierOTPEntity) private supplierOtpRepository: Repository<SupplierOTPEntity>,
    private categoryService: CategoryService,
    private jwtService: JwtService,
    @Inject(REQUEST) private req: Request
  ) { }

  async signup(supplierSignDto: SupplierSignDto) {
    const { categoryId, city, invite_code, manager_family, manager_name, phone, store_name } = supplierSignDto
    const supplier = await this.supplierRepository.findOneBy({ phone })
    if (supplier) throw new ConflictException(ConflictMessage.Supplier)
    const category = await this.categoryService.findOneById(categoryId)
    let agent: SupplierEntity | null = null
    if (invite_code) agent = await this.supplierRepository.findOneBy({ invite_code })
    const mobileNumber = parseInt(phone)
    const accountData: Partial<SupplierEntity> = {
      manager_family,
      manager_name,
      phone,
      city,
      store_name,
      categoryId: category.id,
      invite_code: mobileNumber.toString(32).toUpperCase()
    };
    if (agent?.id) accountData.agentId = agent.id;
    const account = this.supplierRepository.create(accountData);
    await this.supplierRepository.save(account);
    await this.createOtpForSupplier(account)
    return { message: PublicMessage.SentOtp }
  }

  async createOtpForSupplier(supplier: SupplierEntity) {
    const code = randomInt(10000, 99999).toString()
    const expiresIn = new Date(new Date().getTime() + 1000 * 60 * 2)
    let otp = await this.supplierOtpRepository.findOneBy({ supplierId: supplier.id })
    if (otp) {
      if (otp.expires_in > new Date()) throw new BadRequestException(BadRequestMessage.SomeThingWrong)
      otp.code = code
      otp.expires_in = expiresIn
    } else {
      otp = this.supplierOtpRepository.create({ code, expires_in: expiresIn, supplierId: supplier.id })
    }
    otp = await this.supplierOtpRepository.save(otp)
    supplier.otpId = otp.id
    await this.supplierRepository.save(supplier)
  }

  async checkOtp(otpDto: CheckOtpDto) {
    const { code, mobile } = otpDto
    const now = new Date()
    const supplier = await this.supplierRepository.findOne({ where: { phone: mobile }, relations: { otp: true } })
    if (!supplier || !supplier?.otp) throw new UnauthorizedException(NotFoundMessage.UserNotFound)
    if (supplier?.otp?.code !== code) throw new UnauthorizedException(BadRequestMessage.SomeThingWrong)
    if (supplier?.otp?.expires_in < now) throw new UnauthorizedException(NotFoundMessage.OtpNotFound)
    if (!supplier.mobile_verify) await this.supplierRepository.update({ id: supplier.id }, { mobile_verify: true })
    const { accessToken, refreshToken } = this.makeTokensForUser({ id: supplier.id })
    return { accessToken, refreshToken, message: "You Logged-in Successfully" }
  }

  makeTokensForUser(payload: TTokenPayload) {
    const accessToken = this.jwtService.sign(payload, { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: "30d" })
    const refreshToken = this.jwtService.sign(payload, { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: "1y" })
    return { accessToken, refreshToken }
  }

  async validateAccessToken(token: string) {
    try {
      const payload = this.jwtService.verify<TTokenPayload>(token, { secret: process.env.ACCESS_TOKEN_SECRET })
      if (typeof payload === "object" && payload?.id) {
        const supplier = await this.supplierRepository.findOneBy({ id: payload.id })
        if (!supplier) throw new UnauthorizedException(PublicMessage.LoggedIn)
        return supplier
      }
      throw new UnauthorizedException(PublicMessage.LoggedIn)
    } catch (error) {
      throw new UnauthorizedException(PublicMessage.LoggedIn)
    }
  }

  async saveSupplementaryInfo(infoDto: SupplementaryInfoDto) {
    const { id } = this.req.user
    const { email, national_code } = infoDto
    let supplier = await this.supplierRepository.findOneBy({ national_code })
    if (supplier && supplier.id !== id) throw new ConflictException(ConflictMessage.NationalCode)
    supplier = await this.supplierRepository.findOneBy({ email })
    if (supplier && supplier.id !== id) throw new ConflictException(ConflictMessage.Email)
    await this.supplierRepository.update({ id }, { email, national_code, status: SupplierStatus.SupplementaryInfo })
    return { message: PublicMessage.Updated }
  }
}
