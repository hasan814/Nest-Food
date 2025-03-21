import { IsBoolean, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Fast Food', description: 'The title of the category' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'fast-food', description: 'The slug for URL-friendly identifiers' })
  @IsString()
  slug: string;

  @ApiProperty({ example: true, description: 'Whether the category should be visible' })
  @IsBoolean()
  show: boolean;

  @ApiProperty({ example: 2, required: false, description: 'Optional parent category ID for nested categories' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  parentId?: number;
}
