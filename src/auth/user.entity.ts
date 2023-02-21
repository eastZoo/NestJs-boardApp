import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // eager: true => 유저를 가져올때 게시물도 같이 가져올 수 있게.
  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];

  async validatePassword(password: string): Promise<boolean> {
    let isValid = await bcrypt.compare(password, this.password);
    return isValid;
  }
}
