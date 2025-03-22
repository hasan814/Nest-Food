import { IsMobilePhone, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SendOtpDto {
  @ApiProperty()
  @IsMobilePhone("fa-IR", {}, { message: "message number is invalid" })
  mobile: string
}

export class CheckOtpDto {
  @ApiProperty()
  @IsMobilePhone("fa-IR", {}, { message: "message number is invalid" })
  mobile: string;

  @ApiProperty()
  @IsString()
  @Length(5, 5, { message: "Incorrect Code" })
  code: string
}