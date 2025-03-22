import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsMobilePhone,
  IsOptional,
} from 'class-validator';

export class SupplierSignDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  store_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  manager_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  manager_family: string;

  @ApiProperty()
  @IsMobilePhone('fa-IR')
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  invite_code: string;
}
