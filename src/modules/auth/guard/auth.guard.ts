import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { SKIP_AUTH } from "src/common/decorators/skip-auth.decorator";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { isJWT } from "class-validator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector
  ) { }
  async canActivate(context: ExecutionContext) {
    const isSkippedAuth = this.reflector.get<boolean>(SKIP_AUTH, context.getHandler())
    if (isSkippedAuth) return true
    const httpContext = context.switchToHttp()
    const request: Request = httpContext.getRequest<Request>()
    const token = this.extractToken(request)
    request.user = await this.authService.validateAccessToken(token)
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