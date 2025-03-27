import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { RequestData } from '../payment/types/interface';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ZarinpalService {
  constructor(private readonly httpService: HttpService) { }

  async sendRequest(data: RequestData) {
    const { amount, description, user } = data;
    const options = {
      merchant_id: process.env.ZARINPALL_MERCHANT_ID,
      amount: amount * 10,
      description,
      metadata: {
        email: user?.email ?? '',
        mobile: user?.mobile ?? '',
      },
      callback_url: process.env.ZARINPAL_CALLBACK_URL || 'http://localhost:3000/payment/verify', // Use env variable for callback
    };
    try {
      const result = await lastValueFrom(
        this.httpService
          .post(process.env.ZARINPAL_REQUEST_URL, options)
          .pipe(
            map((res) => res.data),
            catchError((error) => {
              console.error('Zarinpal request error:', error.response || error.message);
              throw new InternalServerErrorException('Zarinpal Error');
            }),
          ),
      );
      const { authority, code } = result?.data || {};
      if (code === 100 && authority) {
        return {
          code,
          authority,
          gatewayURL: `${process.env.ZARINPAL_GATEWAY_URL}/${authority}`,
        };
      }
      throw new BadRequestException('Connection failed with Zarinpal');
    } catch (error) {
      console.error('Error during Zarinpal request:', error.message || error);
      throw error;
    }
  }

  async verifyRequest(data: any) {
    const option = {
      authority: data.authority,
      amount: data.amount * 10,
      merchant_id: process.env.ZARINPALL_MERCHANT_ID
    }
    const result = await lastValueFrom(
      this.httpService.post(process.env.ZARINPAL_VERIFY_URL, option, {})
        .pipe(map((res) => res.data))
        .pipe(catchError(err => {
          throw new InternalServerErrorException("Zarinpal Failed")
        }))
    )
    return result
  }
}
