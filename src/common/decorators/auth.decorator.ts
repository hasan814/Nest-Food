import { applyDecorators, UseGuards } from "@nestjs/common"
import { SupplierAuthGuard } from "src/modules/supplier/guard/supplier-auth.guard"
import { ApiBearerAuth } from "@nestjs/swagger"
import { AuthGuard } from "src/modules/auth/guard/auth.guard"


export const UserGuard = () => {
  return applyDecorators(
    ApiBearerAuth("Authorization"),
    UseGuards(AuthGuard)
  )
}


export const SupplierGuard = () => {
  return applyDecorators(
    ApiBearerAuth("Authorization"),
    UseGuards(SupplierAuthGuard)
  )
}