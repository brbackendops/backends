import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserReposioty } from '../user.repository';

@Injectable()
export class Authenticate implements NestMiddleware {
  constructor(
    @InjectRepository(UserReposioty)
    private userepo: UserReposioty,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers && req.headers.hasOwnProperty('authorization')) {
        const token = req.headers.authorization.split(' ')[1];
        const data = await jwt.verify(token, '123812jkqdjqwejknlqqpweo190');
        const user = await this.userepo.getUser(data.email);
        if (user) {
          const { password, ...userObj } = user;
          req.user = userObj;
          next();
        } else {
          res.status(401).json({
            status: 'failed',
            message: 'user not authenticated',
          });
        }
      } else {
        res.status(401).json({
          status: 'failed',
          message: 'user not authenticated',
        });
      }
    } catch (error) {
      res.status(401).json({
        status: 'failed',
        message: 'invalid token',
      });
    }
  }
}
