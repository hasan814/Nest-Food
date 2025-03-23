import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { IUser } from "src/modules/user/interface/user-request.interface";

declare global {
  namespace Express {
    export interface Request {
      user?: UserEntity | SupplierEntity | IUser
    }
  }
}