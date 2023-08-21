import { Component, ViewChild } from '@angular/core';
import { DxDrawerComponent } from 'devextreme-angular';

export interface IList {
  id: number;
  text: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent | undefined;

  navigation = [
    { id: 1, text: 'Products', icon: 'product' },
    { id: 2, text: 'Sales', icon: 'money' },
    { id: 3, text: 'Customers', icon: 'group' },
    { id: 4, text: 'Employees', icon: 'card' },
    { id: 5, text: 'Reports', icon: 'chart' },
  ];

  showSubmenuModes: string[] = ['slide', 'expand'];
  positionModes: string[] = ['left', 'right'];
  showModes: string[] = ['push', 'shrink', 'overlap'];
  text: string | undefined;
  selectedOpenMode = 'shrink';
  selectedPosition = 'left';
  selectedRevealMode = 'slide';
  isDrawerOpen = true;
  elementAttr: any;
  toolbarContent = [{
    widget: 'dxButton',
    location: 'before',
    options: {
      icon: 'menu',
      onClick: () => this.isDrawerOpen = !this.isDrawerOpen,
    },
  }];;
}
