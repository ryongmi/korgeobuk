import { Controller, Get, HttpCode, Patch, Post } from '@nestjs/common';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectDto } from './dtos/project.dto';
import { ProjectService } from './project.service';

@ApiTags('service')
@Controller('service')
@Serialize(ProjectDto)
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: '서비스 가져오기' })
  @ApiResponse({
    status: 200,
    description: '서비스를 성공적으로 가져왔습니다.',
  })
  async getAllProject() {}

  @Get()
  async getProject() {}

  @Post()
  async postCreateProject() {}

  @Patch()
  async patchUpdateProject() {}
}
