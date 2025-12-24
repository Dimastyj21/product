import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class InstanceHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const instanceName = process.env.INSTANCE_NAME || 'unknown';
    res.setHeader('X-App-Instance', instanceName);
    next();
  }
}