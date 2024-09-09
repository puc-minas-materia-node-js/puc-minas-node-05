import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FilterDto } from 'src/helpers/pagination/dto/filter.dto';
// import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Req() request, @Body() createProjectDto: CreateProjectDto) {
    const username = request.user.username;

    return this.projectsService.create(username, createProjectDto);
  }

  @Get()
  // @UseInterceptors(CacheInterceptor)
  // @CacheTTL(30000)
  findAll(@Req() request, @Query() filter?: FilterDto) {
    return this.projectsService.findAllPaginated(request.user.username, filter);
  }

  @Get(':id')
  // @UseInterceptors(CacheInterceptor)
  // @CacheTTL(30000)
  findOne(@Req() request, @Param('id') id: number) {
    return this.projectsService.findOne(request.user.username, id);
  }

  @Patch(':id')
  update(
    @Req() request,
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(
      request.user.username,
      id,
      updateProjectDto,
    );
  }
}
