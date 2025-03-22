import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { SupplierService } from "../services/supplier.service";
import { Request } from "express";
import { isJWT } from "class-validator";

@Injectable()
export class SupplierAuthGuard implements CanActivate {
  constructor(private supplierService: SupplierService) { }
  async canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp()
    const request: Request = httpContext.getRequest<Request>()
    const token = this.extractToken(request)
    request.user = await this.supplierService.validateAccessToken(token)
    return true
  }
  protected extractToken(request: Request) {
    const { authorization } = request.headers
    if (!authorization || authorization?.trim() == "") throw new UnauthorizedException("Login on Your Account!")
    const [bearer, token] = authorization?.split(" ")
    if (bearer?.toLowerCase() !== "bearer" || !token || !isJWT(token)) throw new UnauthorizedException("Login on your account!")
    return token
  }
}