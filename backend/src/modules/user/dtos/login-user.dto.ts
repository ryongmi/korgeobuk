import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'userLoginId',
    description: '사이트 회원가입할때 저장되는 유저 ID',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'userPw@@1234',
    description: '회원가입할때 저장되는 유저 패스워드',
  })
  @IsString()
  password: string;
}
