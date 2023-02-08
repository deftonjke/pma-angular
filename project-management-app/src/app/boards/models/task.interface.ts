export interface Task {
  _id?: string;
  title: string;
  order: number;
  boardId?: string;
  columnId?: string;
  description: string;
  userId: string;
  users: string[];
}

export interface TaskForUpdateInSet {
  _id: string;
  order: number;
  columnId: string;
}
