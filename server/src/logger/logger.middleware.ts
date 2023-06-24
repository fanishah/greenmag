import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { ip, method, baseUrl } = req;
    const userAgent = req.get('User-Agent') || '';
    const startTime = process.hrtime();
    const isReqIMG = baseUrl.split('/');
    if (isReqIMG[1] !== 'img') {
      res.on('finish', () => {
        const { statusCode } = res;
        const contentLength = res.get('Content-Length');
        const dif = process.hrtime(startTime);
        const resTime = dif[0] * 1e3 + dif[1] * 1e-6;
        console.log(
          `${method} ${baseUrl} ${statusCode} ${contentLength} - ${resTime.toFixed(
            2,
          )}ms ${userAgent} ${ip} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        );
      });
    }

    next();
  }
}
