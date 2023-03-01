import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/boards/models/task.interface';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  @Input() result!: Task;

  taskUsersObjects: User[] = [];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService
      .getUsers()
      .subscribe(
        users =>
          (this.taskUsersObjects = users.filter(user =>
            this.result.users.includes(user._id)
          ))
      );
  }

  navigateToBoard() {
    this.router.navigate(['/board', this.result.boardId]);
  }
}
