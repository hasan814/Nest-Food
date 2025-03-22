import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsMobilePhone,
  IsOptional,
  IsIdentityCard,
  IsEmail,
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


export class SupplementaryInfoDto {
  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsIdentityCard("IR")
  national_code: string
}

export class AcceptedDocsDto {
  @ApiProperty({ format: "binary" })
  acceptedDoc: string

  @ApiProperty({ format: "binary" })
  image: string
}