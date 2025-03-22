import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { SupplierOTPEntity } from "src/modules/supplier/entities/supplier-otp.entity"
import { CategoryEntity } from "src/modules/category/entities/category.entity"
import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity"
import { AddressEntity } from "src/modules/user/entities/address.entity"
import { UserEntity } from "src/modules/user/entities/user.entity"
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
      UserEntity,
      AddressEntity,
      CategoryEntity,
      SupplierEntity,
      SupplierOTPEntity,
    ]
  }
}