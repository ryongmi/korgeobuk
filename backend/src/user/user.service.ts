import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entitys/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { User_Role } from './entitys/user_role.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findById(id: number) {
    if (!id) return null;

    return await this.repo.findOneBy({ id });
  }

  async findByUserId(user_id: string) {
    return await this.repo.findOneBy({ user_id });
  }

  async findByUserIdOREmail(user_id: string, email: string) {
    return await this.repo.findBy([{ user_id }, { email }]);
  }

  async create(
    transactionManager: EntityManager,
    hashPassword: string,
    attrs: Partial<User>,
  ) {
    const user = await transactionManager
      .getRepository(User)
      .save({ ...attrs, password: hashPassword });
    await transactionManager
      .getRepository(User_Role)
      .save({ user_id: user.id });
    return user;
  }
}
