import { Body, Controller , Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-tasks-dto';
import { Task } from './task.entity';
import { HResponse, response } from './tasks.utils'
import { TaskStatusEnumDto } from './dto/task-status-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/get-user-decorator';
import { User } from '../user/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    constructor(private tasksService: TasksService){}

    @Get("/:id")
    getTaskHandler(@Param('id') id:string , @GetUser() user:User): Promise<Task> {
        return this.tasksService.getTaskbyId(id,user)
    }

    @Post("/new")
    createTaskHandler(@Body() payload: CreateTaskDto , @GetUser() user:User): Promise<Task> {
        return this.tasksService.createTask(payload,user)
    }

    @Patch("/:id/update/status")
    updateTaskStatusHandler(@Param("id") id:string, @Body() sbody: TaskStatusEnumDto, @GetUser() user:User): Promise<response> {
        return this.tasksService.updateStatus(id,sbody,user)
    }

    @Get("/filter/status")
    filterTaskHandler(@Body() sbody: TaskStatusEnumDto): Promise<HResponse> {
        return this.tasksService.filterTask(sbody)
    }

    @Delete("/:id/delete")
    deleteTaskHandler(@Param("id") id: string,  @GetUser() user:User):Promise<response> {
        return this.tasksService.deleteTask(id,user)
    }

}
