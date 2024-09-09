import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { ProjectsService } from 'src/projects/projects.service';
import { PageService } from 'src/helpers/pagination/page.service';
import { FilterDto } from 'src/helpers/pagination/dto/filter.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly projectsService: ProjectsService,
    private readonly pageService: PageService,
    private readonly usersService: UsersService,
  ) {}

  async create(username: string, createTaskDto: CreateTaskDto) {
    const user = await this.usersService.findOneByOrFail({
      email: username,
    });

    const project = await this.projectsService.findOneByOrFail(
      username,
      createTaskDto.projectId,
    );
    return this.tasksRepository.save({ ...createTaskDto, project, user });
  }

  async findAll(username: string) {
    const user = await this.usersService.findOneByOrFail({
      email: username,
    });

    return this.tasksRepository.find({ where: { user } });
  }

  async findAllPaginated(username: string, filter?: FilterDto) {
    const user = await this.usersService.findOneByOrFail({
      email: username,
    });

    if (!filter) {
      return this.findAll(username);
    }

    return this.pageService.paginate(
      this.tasksRepository,
      {
        page: filter.page,
        pageSize: filter.pageSize,
      },
      { user },
    );
  }

  async findOne(username: string, id: number) {
    const user = await this.usersService.findOneByOrFail({
      email: username,
    });

    return this.tasksRepository.findOneBy({ id, user });
  }

  async update(username: string, id: number, updateTaskDto: UpdateTaskDto) {
    const user = await this.usersService.findOneByOrFail({
      email: username,
    });

    return this.tasksRepository.update({ id, user }, updateTaskDto);
  }

  remove(id: number) {
    return this.tasksRepository.delete(id);
  }
}
