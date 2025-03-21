import { CheckOtpDto, SendOtpDto } from '../dto/otp.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume';
import { AuthService } from '../services/auth.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/send-otp")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  sendOtp(@Body() otpDto: SendOtpDto) {
    return this.authService.sendOtp(otpDto)
  }
  @Post("/check-otp")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  checkOtp(@Body() otpDto: CheckOtpDto) {
    return this.authService.checkOtp(otpDto)
  }

}
