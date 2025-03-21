// search.component.ts
import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrl: 'search.component.scss',
  standalone: false,
  animations: [
    trigger('fancyDropdown', [
      state('closed', style({
        opacity: 0,
        transform: 'scaleY(0)',
        transformOrigin: 'top',
        display: 'none'
      })),
      state('open', style({
        opacity: 1,
        transform: 'scaleY(1)',
        transformOrigin: 'top',
        display: 'block'
      })),
      transition('closed => open', animate('1300ms cubic-bezier(0.175, 0.885, 0.320, 1.275)')),
      transition('open => closed', animate('1200ms ease-out'))
    ])
  ]
})
export class SearchComponent {
  searchTerm: string = '';
  showAdvancedSearch: boolean = false;
  showResults: boolean = false;
  inputWidth: number = 0;
  filter1: string = '';
  filter2: string = '';

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  ngAfterViewInit() {
    this.inputWidth = this.searchInput.nativeElement.offsetWidth;
  }

  onSearchInput() {
    this.showResults = this.searchTerm.length > 0;
  }

  toggleAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
    if(this.showAdvancedSearch){
      this.showResults = false;
    }
  }

  applyAdvancedSearch() {
    this.showAdvancedSearch = false;
    this.showResults = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.inputWidth = this.searchInput.nativeElement.offsetWidth;
  }
}