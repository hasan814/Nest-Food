import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CheckOtpDto, SendOtpDto } from '../dto/otp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TTokenPayload } from '../types/payload';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { OTPEntity } from 'src/modules/user/entities/otp.entity';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(OTPEntity) private otpRepository: Repository<OTPEntity>,
    private jwtService: JwtService,
  ) { }

  async sendOtp(otpDto: SendOtpDto) {
    const { mobile } = otpDto
    let user = await this.userRepository.findOneBy({ mobile })
    if (!user) {
      user = this.userRepository.create({ mobile })
      user = await this.userRepository.save(user)
    }
    await this.createOtpForUser(user)
    return { message: "Sent Code Successfully!" }
  }


  async checkOtp(otpDto: CheckOtpDto) {
    const { code, mobile } = otpDto
    const now = new Date()
    const user = await this.userRepository.findOne({ where: { mobile }, relations: { otp: true } })
    if (!user || !user?.otp) throw new UnauthorizedException("Not Found Accound!")
    if (user?.otp?.code !== code) throw new UnauthorizedException("Otp code is incorrect!")
    if (user?.otp?.expires_in < now) throw new UnauthorizedException("Otp Code is expired!")
    if (!user.mobile_verify) await this.userRepository.update({ id: user.id }, { mobile_verify: true })
    const { accessToken, refreshToken } = this.makeTokensForUser({ id: user.id })
    return { accessToken, refreshToken, message: "You Logged-in Successfully" }
  }

  async checkEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email })
    if (user) throw new ConflictException("Email is already exist!")
  }

  async checkMobile(mobile: string) {
    const user = await this.userRepository.findOneBy({ mobile })
    if (user) throw new ConflictException("Mobile is Already exist!")
  }

  async createOtpForUser(user: UserEntity) {
    const code = randomInt(10000, 99999).toString()
    const expiresIn = new Date(new Date().getTime() + 1000 * 60 * 2)
    let otp = await this.otpRepository.findOneBy({ userId: user.id })
    if (otp) {
      if (otp.expires_in > new Date()) throw new BadRequestException("Otp Code not expired")
      otp.code = code
      otp.expires_in = expiresIn
    } else {
      otp = this.otpRepository.create({ code, expires_in: expiresIn, userId: user.id })
    }
    otp = await this.otpRepository.save(otp)
    user.otpId = otp.id
    await this.userRepository.save(user)
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
        const user = await this.userRepository.findOneBy({ id: payload.id })
        if (!user) throw new UnauthorizedException("Login on into Your Account!")
        return user
      }
      throw new UnauthorizedException("Login on into Your Account!")
    } catch (error) {
      throw new UnauthorizedException("Login on into Your Account!")
    }
  }

}
