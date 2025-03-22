import { SupplementaryInfoDto, SupplierSignDto } from '../dto/supplier.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { SupplierService } from '../services/supplier.service';
import { SupplierGuard } from 'src/common/decorators/auth.decorator';
import { CheckOtpDto } from 'src/modules/auth/dto/otp.dto';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  @Post('/signup')
  signup(@Body() supplierSignDto: SupplierSignDto) {
    return this.supplierService.signup(supplierSignDto)
  }

  @Post('/check-otp')
  checkOtp(@Body() supplierDto: CheckOtpDto) {
    return this.supplierService.checkOtp(supplierDto)
  }

  @Post('/supplementary-Info')
  @SupplierGuard()
  supplementaryInfo(@Body() infoDto: SupplementaryInfoDto) {
    return this.supplierService.saveSupplementaryInfo(infoDto)
  }

}
