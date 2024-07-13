import {
   CanActivate,
   ExecutionContext,
   Inject,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(private readonly jwtService: JwtService) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();

      const token = this.extractTokenFromHeader(request);

      if (!token) {
         throw new UnauthorizedException('No token provided');
      }

      const payloadFromToken = await this.jwtService.decode(token);

      try {
         const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET,
         });
         request['user'] = payload;
      } catch {
         throw new UnauthorizedException('Invalid token');
      }

      if (payloadFromToken.exp < Date.now()) {
         throw new UnauthorizedException('Token expired');
      }

      return true;
   }

   private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
   }
}
