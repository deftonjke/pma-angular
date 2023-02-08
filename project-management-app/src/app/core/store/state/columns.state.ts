import { Column } from '../../../boards/models/column.interface';
import { User } from '../../models/user.model';

export interface ColumnsState {
  columns: Column[];
  boardId: string;
  boardUsers: User[];
  error: string;
}

export const initialColumnState: ColumnsState = {
  columns: [],
  boardId: '',
  boardUsers: [],
  error: '',
};
