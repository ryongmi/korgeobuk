import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { TransactionInterceptor } from 'src/interceptors/transaction.interceptor';
import { TransactionManager } from 'src/decorators/transaction-manager.decorator';
import { EntityManager } from 'typeorm';

@Controller('api')
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signout')
  signOut(@Session() session: any) {
    session.user = null;
    return null;
  }

  @Post('/signin')
  signin(@Body() body: CreateUserDto, @Session() session: any) {
    return this.authService.signin(body.user_id, body.password).then((user) => {
      session.user = {
        id: user.id,
        user_id: user.user_id,
        user_id_type: user.user_id_type,
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        profile_image: user.profile_image,
      };
      return user;
    });
  }

  @Post('/signup')
  @UseInterceptors(TransactionInterceptor)
  async createUser(
    @Body() body: CreateUserDto,
    @TransactionManager() transactionManager: EntityManager,
  ) {
    return this.authService.signup(transactionManager, body);
  }
}
