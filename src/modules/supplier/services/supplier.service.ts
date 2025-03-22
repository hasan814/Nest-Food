import { ConflictException, Injectable } from '@nestjs/common';
import { SupplierOTPEntity } from '../entities/supplier-otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierSignDto } from '../dto/supplier.dto';
import { ConflictMessage } from 'src/common/enums/message.enum';
import { CategoryService } from 'src/modules/category/services/category.service';
import { SupplierEntity } from '../entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity) private supplierRepository: Repository<SupplierEntity>,
    @InjectRepository(SupplierOTPEntity) private supplierOtpRepository: Repository<SupplierOTPEntity>,
    private categoryService: CategoryService
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

    if (agent?.id) {
      accountData.agentId = agent.id;
    }

    const account = this.supplierRepository.create(accountData);
    await this.supplierRepository.save(account);

  }

}
