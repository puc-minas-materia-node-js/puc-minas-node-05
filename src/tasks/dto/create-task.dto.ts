import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
    @IsNotEmpty({ message: 'O nome da tarega não pode ser vazio' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'O Status da tarefa não pode ser vazio' })
    @IsEnum(TaskStatus)
    status: TaskStatus

    @IsNotEmpty()
    @IsNumber()
    projectId: number
}
