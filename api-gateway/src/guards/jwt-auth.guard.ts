import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { RedisService } from '../modules/internal/redis/redis.service';
interface JwtPayload {
  uuid: string;
  email: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private publicKey: string;

  constructor(private readonly redisService: RedisService) {
    this.publicKey = this.redisService.getPublicKey(
      'auth:publicKey',
    ) as unknown as string;
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: JwtPayload }>();
    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException('Access Token is missing');
    }

    try {
      const payload = jwt.verify(token, this.publicKey, {
        algorithms: ['RS256'],
      }) as JwtPayload;

      request.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromCookie(request: Request): string | null {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request.cookies?.accessToken || null;
  }
}
