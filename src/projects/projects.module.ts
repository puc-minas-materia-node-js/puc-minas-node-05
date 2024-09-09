import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from 'src/helpers/pagination/pagination.module'
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    PaginationModule,
    UsersModule, 
    TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService]
})
export class ProjectsModule {}
