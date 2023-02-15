import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm/data-source/DataSource';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
