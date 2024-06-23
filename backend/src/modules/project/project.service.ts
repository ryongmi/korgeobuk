import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from '../../entities/service.entity';
import { Repository } from 'typeorm';
import { ProjectException } from '../../exception/project.exception';

@Injectable()
export class ProjectService {
  constructor(@InjectRepository(Service) private repo: Repository<Service>) {}

  async findAll(): Promise<Service[]> {
    return await this.repo.find();
  }

  async findById(id: string): Promise<Service> {
    return await this.repo.findOneBy({ id });
  }

  async createProject(attrs: Partial<Service>): Promise<Service> {
    return await this.repo.save(attrs);
  }

  async updateProject(attrs: Partial<Service>): Promise<Service> {
    const project = await this.findById(attrs.id);
    if (!project) {
      throw ProjectException.projectNotFound();
    }
    Object.assign(project, attrs);

    return await this.repo.save(project);
  }

  async deleteProject(id: string) {
    if (!id) return null;

    this.repo.softDelete(id);
  }
}
