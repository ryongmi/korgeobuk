import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

// 클라이언트에서 가지고 있을 데이터
export class UserDto {
  @ApiProperty({
    example: 'userLoginId',
    description: 'The ID of the user',
  })
  @Expose()
  userId: string;

  @ApiProperty({ example: 'user', description: 'The ID of the user' })
  @Expose()
  name: string;

  @ApiProperty({ example: '유저', description: 'The ID of the user' })
  @Expose()
  nickname: string;

  @ApiProperty({ example: 'user@email.com', description: 'The ID of the user' })
  @Expose()
  profileImage: string;
}
