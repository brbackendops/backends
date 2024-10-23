import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { QuotesModule } from './quotes/quotes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [
    UserModule,
    QuotesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'quotesdb',
      autoLoadEntities: true,
      synchronize: true,
      cache: {
        duration: 30000,
      },
    }),
    VotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
