import { CreateTaskDto } from './dto/create-tasks-dto';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './tasks.model';
import { HResponse, response } from './tasks.utils';
import { TaskStatusEnumDto } from './dto/task-status-dto';
import { User } from '../user/user.entity';
import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';


export interface TaskRepository extends Repository<Task> {
    this: Repository<Task>;
    createT(body:CreateTaskDto,user:User): Promise<Task>;
    deleteT(id:string,user:User): Promise<response>;
    getT(id:string,user:User): Promise<Task>;
    updateTs(id:string,statusBody:TaskStatusEnumDto,user:User): Promise<response>;
    filterTbasedS(this:Repository<Task>,statusType: TaskStatusEnumDto): Promise<HResponse>;
}

const taskLogger = new Logger('TaskRepository', {
    timestamp: true,
})

export const TaskRepoMethods: Pick<TaskRepository , 'createT'|'getT'|'deleteT'|'updateTs'|'filterTbasedS'> = {

    async createT(this:Repository<Task>,body,user) {
        try {
            const task = this.create({
                title: body.title,
                description: body.description,
                status: TaskStatus.OPEN,
                user,
            });
            await this.save(task)
            return task                
        } catch (error) {
            taskLogger.error(error.message)
            throw new InternalServerErrorException(error.message)
        }    
    },

    async filterTbasedS(this:Repository<Task>,statusType: TaskStatusEnumDto){
        try {
            const tasks = await this.createQueryBuilder('task')
                                .andWhere("task.status=:status",{ status: statusType.status })
                                .getMany();
            const res = new HResponse("success",tasks)                                
            return res 
        } catch (error) {
            taskLogger.error(error.message)
            throw new InternalServerErrorException(error.message)
        }
    },

    async getT(this:Repository<Task>,id,user:User): Promise<Task> {
        try {
            const task = await this.findOneBy({
                id,
                user
            })
            if (!task) {
                throw new NotFoundException("task not found")
            }
            return task
        } catch (error) {
            taskLogger.error(error.message)
            throw new InternalServerErrorException(error.message)
        }
    },

    async updateTs(id:string, statusBody: TaskStatusEnumDto,user:User):Promise<response>{
        try {
            const task = await this.findOneBy({
                id,
                user
            });
            if (!task) {
                throw new NotFoundException("task not found")
            }
            task.status = statusBody.status
            await this.save(task)
            const res = new response("success","successfully updated")
            return res
        } catch (error) {
            taskLogger.error(error.message)
            throw new InternalServerErrorException(error.message)
        }
    },

    async deleteT(this:Repository<Task>,id,user:User){
        try {
            const task = await this.findOneBy({
                id,
                user
            });

            if (!task) {
                throw new NotFoundException("task not found")
            }            
            await this.remove(task)
            
            const res =  new response("success","deleted successfully")
            return res
        } catch (error) {   
            taskLogger.error(error.message)
            throw new InternalServerErrorException(error.message)
        }
    }
}