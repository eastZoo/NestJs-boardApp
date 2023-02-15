import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  //getAllBoards 함수 역시 this를 통해 위의 boards를 반환하기 때문에 타입스크립트 반환 타입은 같다.
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.boardRepository.create({
      title: title,
      description: description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with ${id}`);
    }

    return found;
  }

  // DELETE ID로 특정 게시물 삭제하기
  async deleteBoard(id: number): Promise<void> {
    // 삭제하는 로직이라 리턴값을 따로 주지 않을거기에 void (프로젝트에 따라 다름)
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with this id ${id}`);
    }
    console.log('result', result);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    // getBoardById 내가 찾고자하는 특정 게시물의 정보를 리턴해주는 함수 재사용
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }

  // //getAllBoards 함수 역시 this를 통해 위의 boards를 반환하기 때문에 타입스크립트 반환 타입은 같다.
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // // POST 게시글 생성하는 기능
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(), // 유니크한 값 생성 라이브러리
  //     title: title,
  //     description: description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  // // GET ID로 특정 게시물 가져오기
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(
  //       `잘못된 방에 노크를 하신것 같아요 방번호 ${id} 는 존재하지 않네요..`,
  //     );
  //   }
  //   return found;
  // }
  // // DELETE ID로 특정 게시물 삭제하기
  // deleteBoard(id: string): void {
  //   // 삭제하는 로직이라 리턴값을 따로 주지 않을거기에 void (프로젝트에 따라 다름)
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   // getBoardById 내가 찾고자하는 특정 게시물의 정보를 리턴해주는 함수 재사용
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
