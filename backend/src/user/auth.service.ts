import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signin(userId: string, password: string) {
    const [user] = await this.userService.findByUserId(userId, 'K');

    if (!user) {
      throw new NotFoundException('로그인 정보가 일치하지 않습니다.');
    }

    const [salt, storedHash] = user.password.split(';');

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('로그인 정보가 일치하지 않습니다.');
    }

    return user;
  }

  async signup(attrs: Partial<User>) {
    const users = await this.userService.findByUserId(attrs.user_id, 'K');

    if (users.length) {
      throw new NotFoundException('사용중인 아이디입니다.');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(attrs.password, salt, 32)) as Buffer;

    const result = salt + ';' + hash.toString('hex');

    const user = await this.userService.create(result, attrs);

    return user;
  }

  async signinNaver() {}
  async signinGoogle() {}
}
