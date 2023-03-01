import { Board } from '../../../boards/models/board.interface';

export interface BoardsState {
  boards: Board[];
  error: string;
}

export const initialBoardState: BoardsState = {
  boards: [],
  error: '',
};
