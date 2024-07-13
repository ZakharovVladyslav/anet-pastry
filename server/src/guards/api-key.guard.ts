import {
   CanActivate,
   ExecutionContext,
   ForbiddenException,
   Injectable,
} from '@nestjs/common';
import { config } from 'dotenv';

config();

@Injectable()
export class ApiKeyGuard implements CanActivate {
   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: Request = context.switchToHttp().getRequest();

      return true;
   }
}
