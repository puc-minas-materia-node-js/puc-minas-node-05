import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum TaskStatus {
    pending = 'pending',
    completed = 'completed',
  }
  
  @Entity()
  export class Task {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'name', nullable: false })
    name: string;
  
    @Column({ name: 'status', default: TaskStatus.pending, nullable: false })
    status: TaskStatus;
  
    @ManyToOne(() => Project, (project) => project.tasks, {
      nullable: false,
    })
    project: Project;
  
    @ManyToOne(() => User, (user) => user.tasks, {
      nullable: false,
    })
    @JoinColumn()
    user: User;
}