import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule, getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { TaskRepository , TaskRepoMethods } from './task.repository';
import { Task } from './task.entity';
import { DataSource } from 'typeorm'
import { UserModule } from '../user/user.module';

@Module({
  imports:[ 
    TypeOrmModule.forFeature([Task]),
    UserModule,
  ],
  controllers: [TasksController,],
  providers: [
    TasksService,
    {
      provide: getRepositoryToken(Task),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
          return dataSource.getRepository(Task).extend(TaskRepoMethods)
      },
    }
  ]
})
export class TasksModule {}
