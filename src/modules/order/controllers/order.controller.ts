import { OrderService } from '../services/order.service';
import { Controller } from '@nestjs/common';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) { }

}
