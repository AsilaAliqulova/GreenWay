import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    // console.log(req);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({
        message: 'Headerda token berilmagan',
      });
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: 'Baerer token berilmagan',
      });
    }

    let user: any;
    try {
      user = this.jwtService.verify(token);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({
        message: 'Token verification failed',
      });
    }
    req.user = user; //eng muhim joyi

    console.log(requiredRoles);
    console.log(user);

    const permission = requiredRoles.some((role) => user.role == role);
    if (!permission) {
      console.log(requiredRoles, user.roles);

      throw new ForbiddenException({
        message: 'Sizga ruxsat berilmagan',
      });
    }
    return true;
  }
}
