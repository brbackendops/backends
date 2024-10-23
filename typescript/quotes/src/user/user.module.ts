import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserReposioty } from './user.repository';
import { Authenticate } from './middlewares/auth';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserReposioty, Authenticate, User],
  exports: [Authenticate, User, UserReposioty],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Authenticate)
      .exclude(
        {
          path: '/user/login',
          method: RequestMethod.POST,
        },
        {
          path: '/user/register',
          method: RequestMethod.POST,
        },
      )
      .forRoutes(
        {
          path: '/user/:id/update',
          method: RequestMethod.PATCH,
        },
        {
          path: '/user/:id/delete',
          method: RequestMethod.DELETE,
        },
      );
  }
}
