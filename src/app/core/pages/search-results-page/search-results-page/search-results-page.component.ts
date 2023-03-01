import { Component } from '@angular/core';
import { SearchService } from 'src/app/core/services/search-service/search.service';
import { Task } from '../../../../boards/models/task.interface';

@Component({
  selector: 'app-search-results-page',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.scss'],
})
export class SearchResultsPageComponent {
  constructor(private searchService: SearchService) {}

  public get isSearchStarted(): boolean {
    return this.searchService.startedSearch;
  }

  public get searchRequest(): string {
    return this.searchService.searchRequest;
  }

  public get searchResults(): Task[] {
    return this.searchService.searchResults.value;
  }
}
