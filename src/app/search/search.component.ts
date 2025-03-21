// search.component.ts
import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrl: 'search.component.scss',
  standalone: false,
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