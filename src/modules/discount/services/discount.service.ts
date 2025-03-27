import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestMessage, ConflictMessage, NotFoundMessage, PublicMessage } from 'src/common/enums/message.enum';
import { DeepPartial, Repository } from 'typeorm';
import { CreateDiscountDto } from '../dto/create-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from '../entities/discount.entity';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(DiscountEntity) private discountRepository: Repository<DiscountEntity>
  ) { }

  async create(discountDto: CreateDiscountDto) {
    const { amount, code, expires_in, limit, percent } = discountDto
    await this.checkExistCode(code)
    const discountObject: DeepPartial<DiscountEntity> = { code }
    if ((!amount && !percent) || (amount && percent)) throw new BadRequestException(BadRequestMessage.AlreadyAccepted)
    if (amount && !isNaN(parseFloat(amount.toString()))) discountObject['amount'] = amount
    else if (percent && !isNaN(parseFloat(percent.toString()))) discountObject['percent'] = percent
    if (expires_in && !isNaN(parseInt(expires_in.toString()))) {
      const time = 1000 * 60 * 60 * 24 * parseInt(expires_in.toString());
      discountObject['expires_in'] = new Date(new Date().getTime() + time);
    }
    if (limit && !isNaN(parseInt(limit.toString()))) discountObject['limit'] = limit
    const discount = this.discountRepository.create(discountObject)
    await this.discountRepository.save(discount)
    return { message: PublicMessage.DiscountCreated };
  }

  async checkExistCode(code: string) {
    const discount = await this.discountRepository.findOneBy({ code })
    if (discount) throw new ConflictException(ConflictMessage.CodeAlreadyUsed)
    return discount
  }

  async findOneByCode(code: string) {
    const discount = await this.discountRepository.findOneBy({ code })
    if (!discount) throw new NotFoundException(NotFoundMessage.CodeNotFound)
    return discount
  }

  async findAll() {
    return await this.discountRepository.find({});
  }

  async remove(id: number) {
    const discount = await this.discountRepository.findOneBy({ id });
    if (!discount) throw new BadRequestException(BadRequestMessage.SomeThingWrong);
    await this.discountRepository.delete({ id });
    return { message: PublicMessage.DiscountDeleted };
  }

}
