import { IsEnum } from 'class-validator';
import { TaskStatus } from './../tasks.model';

export class TaskStatusEnumDto {

    @IsEnum(TaskStatus)
    status: TaskStatus
}