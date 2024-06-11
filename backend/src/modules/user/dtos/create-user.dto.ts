import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'userLoginId',
    description: 'The ID of the user',
  })
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsUrl()
  @IsOptional() // null이나 속성이 없을 경우 통과시킴, ""같은건 검사에서 걸려서 오류발생함
  profile_image: string;
}
