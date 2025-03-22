import { Controller, Post, Body, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AcceptedDocsDto, SupplementaryInfoDto, SupplierSignDto } from '../dto/supplier.dto';
import { UploadFileFieldsS3 } from 'src/common/interceptors/upload-file.interceptor';
import { SupplierService } from '../services/supplier.service';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume';
import { SupplierGuard } from 'src/common/decorators/auth.decorator';
import { CheckOtpDto } from 'src/modules/auth/dto/otp.dto';
import { ApiConsumes } from '@nestjs/swagger';

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

  @Put('/upload-document')
  @ApiConsumes(SwaggerConsumes.MultipartData)
  @SupplierGuard()
  @UseInterceptors(UploadFileFieldsS3([{ name: "acceptedDoc", maxCount: 1 }, { name: "image", maxCount: 1 }]))
  uploadDocuments(
    @Body() infoDto: AcceptedDocsDto,
    @UploadedFiles() files: any
  ) {
    return this.supplierService.uploadDocuments(files)
  }

}
