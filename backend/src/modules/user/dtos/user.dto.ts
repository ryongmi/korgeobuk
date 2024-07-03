import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

// 클라이언트에서 가지고 있을 데이터
export class UserDto {
  @ApiProperty({
    example: '0ba9965b-afaf-4771-bc59-7d697b3aa4b2',
    description: '사이트 OR OAuth를 이용해 가입할시 생성되는 유저 ID',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'userLoginId',
    description: '사이트 회원가입할때 저장되는 유저 ID',
  })
  @Expose()
  userId: string;

  @ApiProperty({ example: '홍길동', description: '유저 이름' })
  @Expose()
  name: string;

  @ApiProperty({ example: '동에번쩍', description: '유저 닉네임' })
  @Expose()
  nickname: string;

  @ApiProperty({ example: 'user@email.com', description: '유저 이메일' })
  @Expose()
  profileImage: string | null;
}
