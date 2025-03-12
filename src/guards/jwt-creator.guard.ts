import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

import { Observable } from "rxjs";

@Injectable()
export class JwtCreatorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    
    const req = context.switchToHttp().getRequest();
    console.log(req);

    
    if(!req.admin || !req.admin.is_creator){
      throw new ForbiddenException({message:"Admin is not creator"})
    }
    return true;
  }
}
