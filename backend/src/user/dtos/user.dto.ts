import { Expose } from 'class-transformer';

// 클라이언트에서 가지고 있을 데이터
export class UserDto {
  @Expose()
  user_id: string;

  @Expose()
  name: string;

  @Expose()
  nickname: string;

  @Expose()
  profile_image: string;
}
