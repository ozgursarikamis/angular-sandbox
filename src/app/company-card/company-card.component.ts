import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CompanyInfo } from '../types/company-info';

@Component({
  selector: 'app-company-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-card.component.html',
  styleUrl: './company-card.component.scss'
})
export class CompanyCardComponent {
  @Input() company!: CompanyInfo;

  onActionClick() {
    console.log('Action clicked for company:', this.company.name);
  }
}