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
import { EntityManager } from 'typeorm';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { TransactionInterceptor } from '../../common/interceptors/transaction.interceptor';
import { TransactionManager } from '../../common/decorators/transaction-manager.decorator';
import { OAuthStateGuard } from './guards/oauth-state.guard';
import { UserDto, CreateUserDto, LoginUserDto } from './dtos';
import {
  SwaagerApiBody,
  SwaagerApiOperation,
  SwaagerApiQuery,
  SwaagerApiOkResponse,
  SwaagerApiErrorResponse,
} from '../../common/decorators/swagger-api.decorator';

@ApiTags('auth')
@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  @Get('/login-google')
  @SwaagerApiOperation('구글 로그인')
  @SwaagerApiOkResponse(200, '구글 로그인 OAuth로 redirect 성공')
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
  @SwaagerApiOperation('구글 OAuth 정보 가져오기')
  @SwaagerApiQuery('code', String, '구글에서 return시킨 code')
  @SwaagerApiOkResponse(200, '구글 로그인 성공', UserDto)
  @SwaagerApiErrorResponse(500, '로그인중 서버에서 에러가 발생')
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
  @SwaagerApiOperation('네이버 로그인')
  @SwaagerApiOkResponse(200, '네이버 로그인 OAuth로 redirect 성공')
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
  @SwaagerApiOperation('네이버 OAuth 정보 가져오기')
  @SwaagerApiQuery('code', String, '네이버에서 return시킨 code')
  @SwaagerApiQuery(
    'state',
    String,
    '네이버 OAuth redirect전 서버에서 생성한 임의의 문자열',
  )
  @SwaagerApiOkResponse(200, '네이버 로그인 성공', UserDto)
  @SwaagerApiErrorResponse(500, '로그인중 서버에서 에러가 발생')
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
  @SwaagerApiOperation('로그아웃')
  @SwaagerApiOkResponse(200, '로그아웃 성공')
  @SwaagerApiErrorResponse(500, '로그아웃중 서버에서 에러가 발생')
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
  @SwaagerApiOperation('로그인')
  @SwaagerApiBody(LoginUserDto, '사이트 로그인시 필요한 BODY값')
  @SwaagerApiOkResponse(200, '로그인 성공', UserDto)
  @SwaagerApiErrorResponse(500, '로그인중 서버에서 에러가 발생')
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
  @SwaagerApiOperation('회원가입')
  @SwaagerApiBody(CreateUserDto, '회원가입시 필요한 BODY값')
  @SwaagerApiOkResponse(201, '회원가입 성공', UserDto)
  @SwaagerApiErrorResponse(500, '회원가입중 서버에서 에러가 발생')
  @UseInterceptors(TransactionInterceptor)
  async postCreateUser(
    @Body() body: CreateUserDto,
    @TransactionManager() transactionManager: EntityManager,
  ) {
    return await this.authService.signup(transactionManager, body);
  }
}
