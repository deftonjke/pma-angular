import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search-service/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnDestroy {
  searchData: FormControl = new FormControl('');

  isEmpty: boolean = false;

  constructor(private router: Router, private searchService: SearchService) {}

  onSearch(): void {
    if (
      this.searchData.value.trim() !== '' &&
      (this.searchData.touched || this.searchData.dirty)
    ) {
      this.router.navigate(['/search-results']);
      this.searchService.startedSearch = true;
      this.searchService.searchRequest = this.searchData.value;
      this.searchService.search(this.searchData.value);
    } else {
      this.isEmpty = true;
    }
  }

  onEnterPressed(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.onSearch();
    }
  }

  ngOnDestroy(): void {
    this.searchData.reset();
  }
}
