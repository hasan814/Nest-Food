import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ZarinpalService {
  constructor(private httpService: HttpService) { }

  async sendRequest(data?: any) {
    this.httpService.post(process.env.ZARINPAL_REQUEST_URL, {})
  }

  async verifyRequest() {
    this.httpService.post(process.env.ZARINPAL_VERIFY_URL, {})
  }
}