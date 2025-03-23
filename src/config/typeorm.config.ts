import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { SupplierOTPEntity } from "src/modules/supplier/entities/supplier-otp.entity"
import { OrderItemEntity } from "src/modules/order/entities/order-items.entity"
import { CategoryEntity } from "src/modules/category/entities/category.entity"
import { FeedbackEntity } from "src/modules/menu/entities/feedback.entity"
import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity"
import { MenuTypeEntity } from "src/modules/menu/entities/type.entity"
import { DiscountEntity } from "src/modules/discount/entities/discount.entity"
import { AddressEntity } from "src/modules/user/entities/address.entity"
import { PaymentEntity } from "src/modules/payment/entities/payment.entity"
import { BasketEntity } from "src/modules/basket/entities/basket.entity"
import { OrderEntity } from "src/modules/order/entities/order.entity"
import { UserEntity } from "src/modules/user/entities/user.entity"
import { MenuEntity } from "src/modules/menu/entities/menu.entity"
import { OTPEntity } from "src/modules/user/entities/otp.entity"


export function TypeOrmConfig(): TypeOrmModuleOptions {
  const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env
  return {
    type: "mysql",
    host: DB_HOST,
    port: +DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    autoLoadEntities: false,
    synchronize: true,
    entities: [
      OTPEntity,
      MenuEntity,
      UserEntity,
      OrderEntity,
      BasketEntity,
      AddressEntity,
      PaymentEntity,
      CategoryEntity,
      SupplierEntity,
      MenuTypeEntity,
      FeedbackEntity,
      DiscountEntity,
      OrderItemEntity,
      SupplierOTPEntity,
    ]
  }
}