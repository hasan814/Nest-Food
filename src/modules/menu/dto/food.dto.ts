import { IsNotEmpty, IsString, IsNumber, Min, Max } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class FoodDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(5)
  typeId: number;
}

export class UploadFoodDto extends PartialType(FoodDto) { }
