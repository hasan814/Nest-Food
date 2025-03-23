import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class MenuTypeDto {
  @ApiProperty({ example: "Appetizer", description: "The title of the menu type" })
  @IsString()
  @IsNotEmpty({ message: "Menu title must not be empty." })
  @MaxLength(100, { message: "Menu title must be at most 100 characters long." })
  title: string;
}


export class UploadMenuTypeDto extends PartialType(MenuTypeDto) { }
