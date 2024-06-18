import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Res,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { TransactionInterceptor } from '../../common/interceptors/transaction.interceptor';
import { TransactionManager } from '../../common/decorators/transaction-manager.decorator';
import { EntityManager } from 'typeorm';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { OAuthStateGuard } from './guards/oauth-state.guard';
import { LoginUserDto } from './dtos/login-user.dto';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  @Get('/login-google')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of users.' })
  getLoginGoogle(@Res() res: Response) {
    const url =
      'https://accounts.google.com/o/oauth2/v2/auth' +
      `?client_id=${this.config.get<string>('google.clientId')}` +
      `&redirect_uri=${this.config.get<string>('google.redirectUrl')}` +
      '&response_type=code' +
      '&scope=email profile';

    return res.redirect(url);
  }

  @Get('/login-google/callback')
  @ApiOperation({ summary: 'Get users with optional query parameters' })
  @ApiQuery({
    name: 'code',
    required: true,
    type: String,
    description: 'Filter users by age',
    example: 'defaultName',
  })
  @UseInterceptors(TransactionInterceptor)
  async getLoginGoogleCallback(
    @Query('code') code: string,
    @Session() session: Record<string, any>,
    @TransactionManager() transactionManager: EntityManager,
  ) {
    return await this.authService
      .loginGoogle(transactionManager, code)
      .then(({ user, tokenData }) => {
        session.user = {
          id: user.id,
          // user_id: user.user_id,
          name: user.name,
          nickname: user.nickname,
          email: user.email,
          profileImage: user.profileImage,
        };
        session.oauth = {
          id_token: tokenData.id_token,
          access_token: tokenData.access_token,
        };

        return user;
      });
  }

  @Get('/login-naver')
  getLoginNaver(@Res() res: Response, @Session() session: Record<string, any>) {
    const state = randomBytes(8).toString('hex');
    session.stateCheck = {
      state,
      createAt: new Date(),
    };

    const url =
      'https://nid.naver.com/oauth2.0/authorize' +
      `?client_id=${this.config.get<string>('naver.clientId')}` +
      `&redirect_uri=${this.config.get<string>('naver.redirectUrl')}` +
      '&response_type=code' +
      `&state=${state}`;

    return res.redirect(url);
  }

  @Get('/login-naver/callback')
  @ApiOperation({ summary: 'Get users with optional query parameters' })
  @ApiQuery({
    name: 'code',
    required: true,
    type: String,
    description: 'Filter users by age',
  })
  @ApiQuery({
    name: 'state',
    required: true,
    type: String,
    description: 'Filter users by name',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    type: UserDto,
  })
  @UseGuards(OAuthStateGuard)
  @UseInterceptors(TransactionInterceptor)
  async getLoginNaverCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Session() session: Record<string, any>,
    @TransactionManager() transactionManager: EntityManager,
  ) {
    return await this.authService
      .loginNaver(transactionManager, code, state)
      .then(({ user, tokenData }) => {
        session.user = {
          id: user.id,
          // user_id: user.user_id,
          name: user.name,
          nickname: user.nickname,
          email: user.email,
          profileImage: user.profileImage,
        };
        session.oauth = {
          refresh_token: tokenData.refresh_token,
          access_token: tokenData.access_token,
        };

        if (session.hasOwnProperty('stateCheck')) {
          delete session['stateCheck'];
        }

        return user;
      });
  }

  @Post('/logout')
  @HttpCode(200)
  postLogout(@Session() session: Record<string, any>) {
    if (session.hasOwnProperty('user')) {
      delete session['user'];
    }
    if (session.hasOwnProperty('oauth')) {
      delete session['oauth'];
    }

    return null;
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiBody({ type: LoginUserDto })
  async postLogin(
    @Body() body: LoginUserDto,
    @Session() session: Record<string, any>,
  ) {
    return await this.authService
      .login(body.userId, body.password)
      .then((user) => {
        session.user = {
          id: user.id,
          // user_id: user.user_id,
          name: user.name,
          nickname: user.nickname,
          email: user.email,
          profileImage: user.profileImage,
        };

        return user;
      });
  }

  @Post('/signup')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    type: UserDto,
  })
  @ApiBody({ type: CreateUserDto })
  @UseInterceptors(TransactionInterceptor)
  async postCreateUser(
    @Body() body: CreateUserDto,
    @TransactionManager() transactionManager: EntityManager,
  ) {
    return await this.authService.signup(transactionManager, body);
  }
}
