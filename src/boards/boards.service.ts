import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
  // private를 사용한 이유 : 사용하지 않으면 다른컴포넌트에서 boards 값에 접근가능하기 때문에
  private boards: Board[] = [];

  //getAllBoards 함수 역시 this를 통해 위의 boards를 반환하기 때문에 타입스크립트 반환 타입은 같다.
  getAllBoards(): Board[] {
    return this.boards;
  }
}
