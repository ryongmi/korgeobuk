import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('api')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('test')
  test(@Session() session: any) {
    session.test = false;
    console.log(session);
  }

  @Get('test2')
  test2(@Session() session: any) {
    session.test = true;
    console.log(session);
  }

  @Get('test3')
  test3(@Session() session: any) {
    console.log(session);
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.user = null;
  }

  @Post('/signin')
  signin(@Body() body: createUserDto, @Session() session: any) {
    console.log('signin333');
    console.log(body);
    console.log(session);
    return this.userService.test();
  }

  @Post('/signup')
  async createUser(@Body() body: createUserDto, @Session() session: any) {
    console.log('signup');
    console.log(body);
    return this.authService.signup(body);
  }
}
