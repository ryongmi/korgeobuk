import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entitys/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { User_Role } from './entitys/user-role.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findById(id: string) {
    if (!id) return null;

    return await this.repo.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.repo.findOneBy({ email });
  }

  async findByUserId(user_id: string) {
    return await this.repo.findOneBy({ user_id });
  }

  async findByUserIdOREmail(user_id: string, email: string) {
    return await this.repo.findBy([{ user_id }, { email }]);
  }

  async lastLoginUpdate(id: string) {
    // return await this.repo.save(attrs);

    await this.repo
      .createQueryBuilder()
      .update(User)
      .set({ last_login: new Date() })
      .where('id = :id', { id })
      .execute();
  }

  async updateUser(attrs: Partial<User>) {
    return await this.repo.save(attrs);

    // if (!attrs.id) {
    //   await transactionManager
    //     .getRepository(User_Role)
    //     .save({ user_id: user.id });
    // }
  }

  async createUser(
    transactionManager: EntityManager,
    attrs: Partial<User>,
    hashPassword: string | null = null,
  ) {
    const userInfo =
      hashPassword !== null
        ? { ...attrs, password: hashPassword }
        : { ...attrs };

    const user = await transactionManager.getRepository(User).save(userInfo);
    await transactionManager
      .getRepository(User_Role)
      .save({ user_id: user.id });

    return user;
  }
}
