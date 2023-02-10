import { Controller, Get, Post, Body } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post('/')
  createBoard(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Board {
    // 여기는 Post를 통해 하나만 날리는 리턴 값이기 때문에 모두 가져올때 사용하는 [] 을 쓰지 않아도됨
    return this.boardsService.createBoard(title, description);
  }
}
