import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Req() request, @Body() createTaskDto: CreateTaskDto) {
    const username = request.user.username;
    return this.tasksService.create(username, createTaskDto);
  }

  @Get()
  findAll(@Req() request) {
    const username = request.user.username;
    return this.tasksService.findAll(username);
  }

  @Get(':id')
  findOne(@Req() request, @Param('id') id: number) {
    const username = request.user.username;
    return this.tasksService.findOne(username, id);
  }

  @Patch(':id')
  update(
    @Req() request,
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const username = request.user.username;
    return this.tasksService.update(username, id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tasksService.remove(id);
  }
}
