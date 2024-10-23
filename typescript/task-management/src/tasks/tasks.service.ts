import { CreateTaskDto } from './dto/create-tasks-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { TaskRepository } from './task.repository';
import { HResponse, response } from './tasks.utils'
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatusEnumDto } from './dto/task-status-dto';
import { User } from '../user/user.entity';
import { GetUser } from '../user/get-user-decorator';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private readonly taskrepo:TaskRepository
    ){}


    async getTaskbyId(id: string ,user: User): Promise<Task> {
        const found =  await this.taskrepo.getT(id,user)

        if (!found) {
            throw new NotFoundException(`Task with this ${id} is not found`)
        }

        return found
    }
    
    createTask(createBody: CreateTaskDto , user:User) : Promise<Task> {
        return this.taskrepo.createT(createBody,user)
    }

    updateStatus(id:string,statusBody: TaskStatusEnumDto,user:User) : Promise<response> {
        return this.taskrepo.updateTs(id,statusBody,user)
    }

    filterTask(statusBody: TaskStatusEnumDto): Promise<HResponse> {
        const result = this.taskrepo.filterTbasedS(statusBody)
        return result
    }

    async deleteTask(id:string,user:User): Promise<response> {
        return this.taskrepo.deleteT(id,user)
    }
}
