import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entitys/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Role } from './entitys/role.entity';
import { User_Role } from './entitys/user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, User_Role])],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
