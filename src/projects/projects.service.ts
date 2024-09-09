import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { FilterDto } from 'src/helpers/pagination/dto/filter.dto';
import { PageService } from 'src/helpers/pagination/page.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly pageService: PageService,
    private readonly userService: UsersService,
  ) {}

  async create(username: string, createProjectDto: CreateProjectDto) {
    const user = await this.userService.findOneByOrFail({
      email: username,
    });

    return this.projectRepository.save({ ...createProjectDto, user });
  }

  async findAll(username: string) {
    const user = await this.userService.findOneByOrFail({
      email: username,
    });

    return this.projectRepository.find({ where: { user } });
  }

  async findAllPaginated(username: string, filter?: FilterDto) {
    const user = await this.userService.findOneByOrFail({
      email: username,
    });

    if (!filter) {
      return this.findAll(username);
    }

    return this.pageService.paginate(
      this.projectRepository,
      {
        page: filter.page,
        pageSize: filter.pageSize,
      },
      { user },
    );
  }

  async findOne(username: string, id: number) {
    const user = await this.userService.findOneByOrFail({
      email: username,
    });

    return this.projectRepository.findOne({
      where: { id, user },
      relations: {
        tasks: true,
      },
    });
  }

  async findOneByOrFail(username: string, id: number) {
    const user = await this.userService.findOneByOrFail({
      email: username,
    });

    return this.projectRepository.findOneByOrFail({ id, user });
  }

  async update(
    username: string,
    id: number,
    updateProjectDto: UpdateProjectDto,
  ) {
    const user = await this.userService.findOneByOrFail({
      email: username,
    });

    return this.projectRepository.update({ id, user }, updateProjectDto);
  }

  remove(id: number) {
    return this.projectRepository.delete(id); 
  }
}