import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskForUpdateInSet } from '../../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  createTask(task: Task, boardId: string, columnId: string): Observable<Task> {
    const url = `/boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.post<Task>(url, task);
  }

  getTasksByColumns(boardId: string, columnId: string): Observable<Task[]> {
    const url = `/boards/${boardId}/columns/${columnId}/tasks`;
    return this.http.get<Task[]>(url);
  }

  updateTask(task: Task, taskId: string, boardId: string): Observable<Task> {
    const url = `/boards/${boardId}/columns/${task.columnId}/tasks/${taskId}`;
    return this.http.put<Task>(url, task);
  }

  getAllTasks(boardId: string): Observable<Task[]> {
    const url = `/tasksSet/${boardId}`;
    return this.http.get<Task[]>(url);
  }

  updateSetOfTasks(tasks: TaskForUpdateInSet[]): Observable<Task[]> {
    return this.http.patch<Task[]>('/tasksSet', tasks);
  }

  deleteTask(
    taskId: string,
    boardId: string,
    columnId: string
  ): Observable<Task> {
    return this.http.delete<Task>(
      `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`
    );
  }
}
