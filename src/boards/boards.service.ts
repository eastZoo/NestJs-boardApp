import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  // private를 사용한 이유 : 사용하지 않으면 다른컴포넌트에서 boards 값에 접근가능하기 때문에
  private boards = [];

  getAllBoards() {
    return this.boards;
  }
}
