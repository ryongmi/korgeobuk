import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
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

  @ApiProperty({ example: '홍길동', description: '유저 이름' })
  @IsString()
  name: string;

  @ApiProperty({ example: '동에번쩍', description: '유저 닉네임' })
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'user@email.com', description: '유저 이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example:
      'https://yt3.ggpht.com/yti/ANjgQV-jbwsLEWnWPVS2r82jtApxqmShu-nPXW-_S1n7FCmlug=s88-c-k-c0x00ffffff-no-rj',
    description: '유저 프로필 이미지 주소',
  })
  @IsUrl()
  @IsOptional() // null이나 속성이 없을 경우 통과시킴, ""같은건 검사에서 걸려서 오류발생함
  profileImage: string | null;
}
