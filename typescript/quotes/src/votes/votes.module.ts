import { MiddlewareConsumer, Module } from '@nestjs/common';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { QuotesModule } from '../quotes/quotes.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './votes.entity';
import { VoteRepository } from './votes.repository';
import { Authenticate } from '../user/middlewares/auth';

@Module({
  imports: [TypeOrmModule.forFeature([Vote]), QuotesModule, UserModule],
  controllers: [VotesController],
  providers: [VotesService, VoteRepository],
})
export class VotesModule {
  configure(consume: MiddlewareConsumer) {
    consume.apply(Authenticate).forRoutes('votes');
  }
}
