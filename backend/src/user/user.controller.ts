import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { TransactionInterceptor } from '../common/interceptors/transaction.interceptor';
import { TransactionManager } from '../common/decorators/transaction-manager.decorator';
import { EntityManager } from 'typeorm';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('user')
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  @Post('/test')
  test(@Session() session: any) {
    session.user = { id: 252 };
    return 'test';
  }

  @Get('/login')
  login(@Res() res: Response) {
    let url = 'https://accounts.google.com/o/oauth2/v2/auth';
    url += `?client_id=${this.config.get<string>('GOOGLE_CLIENT_ID')}`;
    url += `&redirect_uri=${this.config.get<string>('GOOGLE_SIGNUP_REDIRECT_URI')}`;
    url += '&response_type=code';
    //   url += "&scope=email profile";
    url += '&scope=email profile';
    console.log('login');
    return res.redirect(url);
  }

  @Get('/signup/redirect')
  logintest(@Req() req: Request) {
    const { code } = req.query;
    console.log(`code: ${code}`);
  }

  @Post('/signin-naver')
  signinNaver(@Body() body: CreateUserDto, @Session() session: any) {
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

  @Post('/signin-google')
  signinGoogle(@Body() body: CreateUserDto, @Session() session: any) {
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
