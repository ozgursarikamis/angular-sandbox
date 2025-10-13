import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('collapseExpand', [
      state('expanded', style({
        height: '*',
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('collapsed', style({
        height: '0',
        opacity: 0,
        transform: 'translateY(-20px)'
      })),
      transition('expanded <=> collapsed', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
    trigger('menuSlide', [
      state('closed', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      state('open', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('closed <=> open', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class SearchBarComponent {
  searchQuery = '';
  isCollapsed = false;
  isMenuOpen = false;

  menuItems: MenuItem[] = [
    { label: 'My Places', icon: '📍' },
    { label: 'Recent Searches', icon: '🕐' },
    { label: 'Settings', icon: '⚙️' }
  ];

  getCollapseState(): string {
    return this.isCollapsed ? 'collapsed' : 'expanded';
  }

  getMenuState(): string {
    return this.isMenuOpen ? 'open' : 'closed';
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSave(): void {
    console.log('Save clicked:', this.searchQuery);
  }

  onAdvancedSearch(): void {
    console.log('Advanced search clicked');
  }

  onClear(): void {
    this.searchQuery = '';
  }

  onMenuItemClick(item: MenuItem): void {
    console.log('Menu item clicked:', item.label);
    this.isMenuOpen = false;
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
    }
  }
}

interface MenuItem {
  label: string;
  icon: string;
}
