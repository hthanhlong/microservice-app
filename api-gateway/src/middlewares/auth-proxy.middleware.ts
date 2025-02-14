import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { KafkaService } from '../modules/kafka/kafka.service';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  constructor(private readonly kafkaService: KafkaService) {}

  private readonly serviceMap = {
    '/products': 'http://localhost:3001',
    '/users': 'http://localhost:3002',
  };

  use(req: Request, res: Response, next: NextFunction) {
    const target = Object.keys(this.serviceMap).find((prefix) =>
      req.url.startsWith(prefix),
    );

    if (!target) {
      return next();
    }

    const proxy = createProxyMiddleware({
      target: this.serviceMap[target],
      changeOrigin: true,
      pathRewrite: { [`^${target}`]: '' },
      credentials: 'include',

      onProxyReq: (proxyReq, req) => {
        if (req.headers.authorization) {
          proxyReq.setHeader('Authorization', req.headers.authorization);
        }
        if (req.headers.cookie) {
          proxyReq.setHeader('Cookie', req.headers.cookie);
        }
      },

      onProxyRes: async (proxyRes, req, res) => {
        const data = await proxyRes.json();

        // Nếu Access Token hết hạn, thử refresh token
        if (proxyRes.statusCode === 401 && data.message === 'Token expired') {
          console.log('🔄 Token expired, refreshing...');

          const refreshToken =
            req.cookies?.refreshToken || req.headers['x-refresh-token'];

          if (!refreshToken) {
            console.log('❌ No Refresh Token found');
            return res
              .status(401)
              .json({ message: 'Session expired, please login again' });
          }

          const newAccessToken =
            await this.kafkaService.requestRefreshToken(refreshToken);

          if (!newAccessToken) {
            return res
              .status(401)
              .json({ message: 'Session expired, please login again' });
          }

          req.headers.authorization = `Bearer ${newAccessToken}`;
          proxyReq.setHeader('Authorization', `Bearer ${newAccessToken}`);

          return proxyRes.send();
        }

        return proxyRes.send();
      },
    });

    proxy(req, res, next);
  }
}
