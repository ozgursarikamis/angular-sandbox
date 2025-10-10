import { Component } from '@angular/core';
import { CompanyInfo } from './types/company-info';
import { CompanyCardComponent } from './company-card/company-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CompanyCardComponent
  ],
  standalone: true,
})
export class AppComponent {
  title = undefined;
  companies: CompanyInfo[] = [
    {
      name: 'TechCorp Solutions',
      logo: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400',
      city: 'San Francisco',
      companyNumber: 'TC-2024-001',
      address: '123 Market Street, Suite 500, San Francisco, CA 94103',
      businessAreas: ['Software Development', 'Cloud Services', 'AI & Machine Learning'],
      products: ['Cloud Platform', 'Analytics Suite', 'Mobile App', 'API Gateway']
    },
    {
      name: 'Global Innovations Ltd',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      city: 'London',
      companyNumber: 'GI-2024-002',
      address: '456 Oxford Street, London W1C 1AP, United Kingdom',
      businessAreas: ['Fintech', 'Blockchain', 'Cybersecurity'],
      products: ['Payment Gateway', 'Crypto Wallet', 'Security Suite', 'Trading Platform']
    },
    {
      name: 'EcoGreen Industries',
      logo: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=400',
      city: 'Berlin',
      companyNumber: 'EG-2024-003',
      address: '789 Friedrichstraße, 10117 Berlin, Germany',
      businessAreas: ['Renewable Energy', 'Sustainability', 'Green Tech'],
      products: ['Solar Panels', 'Energy Management', 'Smart Grid', 'Battery Storage']
    }
  ];
}
