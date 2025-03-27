import { IsNotEmpty, IsString, IsNumber, Min, Max } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class FoodDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ format: 'binary' })
  image: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  typeId: number;
}

export class UploadFoodDto extends PartialType(FoodDto) { }
