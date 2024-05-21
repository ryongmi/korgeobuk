import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  test() {
    return 'test333';
  }

  async findById(id: number) {
    if (!id) return null;

    return await this.repo.findOneBy({ id });
  }

  async findByUserId(userId: string, userType: string) {
    return await this.repo.find({
      where: {
        user_id: userId,
        user_id_type: userType,
      },
    });
  }

  async create(hashPassword: string, attrs: Partial<User>) {
    const user = this.repo.create({
      user_id: attrs.user_id,
      user_id_type: attrs.user_id_type,
      password: hashPassword,
      name: attrs.name,
      nickname: attrs.nickname,
      email: attrs.email,
      profile_image: attrs.profile_image ?? null,
    });

    return this.repo.save(user);
  }
}
