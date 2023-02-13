import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board.model';

// CREATE TABLE board 부분을 의미한다.
@Entity()
export class Board extends BaseEntity {
  // 아래 클래스는 id 열이 Board 엔티티의 기본 키 열임을 나타 낸다.
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;
}
