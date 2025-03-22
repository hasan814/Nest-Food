import { IsEmail, IsString, IsNotEmpty, MaxLength, IsMobilePhone } from "class-validator";

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  last_name: string;

  @IsMobilePhone("fa-IR", {}, { message: "Your Phone Number Format is Incorrect!" })
  mobile: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

