import { HttpModule, HttpService } from "@nestjs/axios";
import { ZarinpalService } from "./http.service";
import { Global, Module } from "@nestjs/common";


@Global()
@Module({
  imports: [HttpModule.register({ maxRedirects: 5, timeout: 5000 })],
  providers: [HttpService, ZarinpalService],
  exports: [HttpService, ZarinpalService],
})

export class HttpApiModule { }