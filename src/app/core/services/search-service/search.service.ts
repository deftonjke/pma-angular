import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { Task } from '../../../boards/models/task.interface';
import { getUserId } from '../../store/selectors/user.selectors';
import { UserState } from '../../store/state/user.state';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  startedSearch: boolean = false;

  searchRequest: string = '';

  searchResults: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  searchSubscription!: Subscription;

  userId: string = '';

  userIdSubscription!: Subscription;

  constructor(private http: HttpClient, private userStore: Store<UserState>) {}

  search(query: string) {
    this.getUserId();
    return this.http
      .get<Task[]>('/tasksSet', {
        params: new HttpParams().set('search', query),
      })
      .pipe(
        map(result => {
          result = result.filter(tasks => tasks.userId === this.userId);
          return result;
        })
      )
      .subscribe(res => this.searchResults.next([...(res as Task[])]));
  }

  getUserId() {
    this.userIdSubscription = this.userStore
      .select(getUserId)
      .subscribe(id => (this.userId = id!));
  }
}
