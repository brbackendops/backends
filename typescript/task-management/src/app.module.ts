import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService }  from '@nestjs/config'
import { DatabaseSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: DatabaseSchema,
    }),
    TasksModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (config: ConfigService) => ({
          type:'postgres',
          host: config.get("DB_HOST"),
          port: config.get("DB_PORT"),
          username: config.get("DB_USER"),
          password: config.get("DB_PASSWORD"),
          database: config.get("DB_NAME"),
          autoLoadEntities: true,
          synchronize: true,
      }),
    }),
  ],

})
export class AppModule {}
