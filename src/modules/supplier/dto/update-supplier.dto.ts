import { SupplierSignDto } from './supplier.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateSupplierDto extends PartialType(SupplierSignDto) { }
