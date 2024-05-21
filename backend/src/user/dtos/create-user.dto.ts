import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';
import { IsNull } from 'typeorm';

export class createUserDto {
  @IsString()
  user_id: string;

  @IsString()
  user_id_type: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  nickname: string;

  @IsEmail()
  email: string;

  @IsUrl()
  @IsOptional()
  profile_image: string;
}
