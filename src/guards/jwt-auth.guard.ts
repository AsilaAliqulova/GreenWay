import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(private readonly jwtservice: JwtService, private readonly reflector: Reflector) { }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException({
        message: "There isn't token on header",
      });
    }
    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException({ message: "Invalid Bearer token" });
    }
    let admin: any;
    try {
      admin = this.jwtservice.verify(token);
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException({ message: "Token verficaton failed" });
    }
    req.admin = admin
    return true;
  }
}
