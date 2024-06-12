import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Role } from '../../entities/role.entity';
import { UserRole } from '../../entities/user-role.entity';
import { HttpModule } from '@nestjs/axios';
import { GoogleOAuthService } from '../auth/google-oauth.service';
import { NaverOAuthService } from '../auth/naver-oauth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserRole]), HttpModule],
  controllers: [UserController],
  providers: [UserService, AuthService, GoogleOAuthService, NaverOAuthService], // 서비스를 providers에 추가
  exports: [UserService, AuthService], // 다른 모듈에서 User 서비스를 사용할 수 있도록 exports에 추가
})
export class UserModule {}
