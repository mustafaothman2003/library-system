import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: any }>();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      // Define a typed shape for the JWT payload to avoid unsafe `any` assignments
      type JwtPayload = {
        sub?: string | number;
        email?: string;
        iat?: number;
        exp?: number;
        [key: string]: unknown;
      };

      // Use a generic on verify to get a typed payload instead of `any`
      // Explicitly pass the secret to ensure verification uses the same key
      const decoded = this.jwtService.verify<JwtPayload>(token, { secret: 'secretKey' });

      request.user = decoded;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}