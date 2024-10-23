import { MiddlewareConsumer, Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { UserModule } from '../user/user.module';
import { Authenticate } from '../user/middlewares/auth';
import { QuotesResposioty } from './quotes.reposiotry';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quotes } from './quotes.entity';
import { OwnerOnly } from './guard/owner.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Quotes]), UserModule],
  controllers: [QuotesController],
  providers: [QuotesService, QuotesResposioty, Quotes , OwnerOnly],
  exports: [Quotes],
})
export class QuotesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Authenticate).forRoutes('quotes');
  }
}
