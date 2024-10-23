import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { QuotesResposioty } from '../quotes.reposiotry';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OwnerOnly implements CanActivate {
  constructor(
    @InjectRepository(QuotesResposioty)
    private qrepo: QuotesResposioty,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>();
    const id = req.params.id;

    const quote = await this.qrepo.findOne({
      where: {
        id,
      },
      relations: {
        created_by: true,
      },
    });
    console.log(quote);
    if (!quote || req.user.id !== quote.created_by.id) {
      throw new NotFoundException('resource not found');
    }
    return req.user.id === quote.created_by.id;
  }
}
