import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'userLoginId',
    description: 'The ID of the user',
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    example: 'userPw@@1234',
    description: 'The ID of the user',
  })
  @IsString()
  password: string;
}
