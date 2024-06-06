import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  user_id: string;

  @IsString()
  @IsOptional()
  user_id_type: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  name: string;

  @IsString()
  nickname: string;

  @IsEmail()
  email: string;

  @IsUrl()
  @IsOptional() // null이나 속성이 없을 경우 통과시킴, ""같은건 검사에서 걸려서 오류발생함
  profile_image: string;
}
