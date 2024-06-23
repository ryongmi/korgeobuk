import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

// 클라이언트에서 가지고 있을 데이터
export class ProjectDto {
  @ApiProperty({ example: 'user', description: 'The ID of the user' })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'userLoginId',
    description: 'The ID of the user',
  })
  @Expose()
  serviceUrl: string;
}
