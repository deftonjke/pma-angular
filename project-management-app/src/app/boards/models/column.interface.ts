export interface Column {
  _id?: string;
  title: string;
  order: number;
  boardId?: string;
}

export interface ColumnsOrder {
  _id: string;
  order: number;
}
