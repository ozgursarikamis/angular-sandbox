import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-search2',
  templateUrl: './search2.component.html',
  styleUrls: ['./search2.component.scss'],
  standalone: false,
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('240ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class Search2Component {
  searchTerm = '';
  showAdvancedSearch = false;
  showResults = false;

  onFocus() {
    this.showResults = true;
  }

  onInput() {
    this.showResults = !!this.searchTerm;
  }

  toggleAdvancedSearch(event: Event) {
    event.stopPropagation();
    this.showAdvancedSearch = !this.showAdvancedSearch;
    if (this.showAdvancedSearch) {
      this.showResults = false;
    }
  }

  closeAdvancedSearch() {
    this.showAdvancedSearch = false;
  }

  applyAdvancedFilters() {
    this.showAdvancedSearch = false;
    this.showResults = true;
  }  
}
