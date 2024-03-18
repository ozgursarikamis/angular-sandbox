import { Component } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [
    `
      [nz-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }

      nz-button-group [nz-button] {
        margin-right: 0;
      }
    `
  ]
})
export class AppComponent {
  title = undefined;
  size: NzButtonSize = 'large';
  tabs = ['Tab 1', 'Tab 2'];
  selectedIndex = 0;

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {
    this.tabs.push('New Tab');
    this.selectedIndex = this.tabs.length;
  }

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  // Drawer:

  drawerVisible = false;
  drawerSize: 'large' | 'default' = 'default';

  get drawerTitle(): string {
    return `${this.drawerSize} Drawer`;
  }

  showDefault(): void {
    this.drawerSize = 'default';
    this.open();
  }

  showLarge(): void {
    this.drawerSize = 'large';
    this.open();
  }

  open(): void {
    this.drawerVisible = true;
  }

  close(): void {
    this.drawerVisible = false;
  }
}
