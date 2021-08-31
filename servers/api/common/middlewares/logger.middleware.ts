import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private httpLogger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction): void {
        const { ip, method, originalUrl } = req;
        const userAgent = req.get('user-agent') || '';
        res.on('finish', () => {
            const { statusCode } = res;
            const contentLength = res.get('content-length');
            this.httpLogger.log(
                `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
            );
        });

        next();
    }
}
