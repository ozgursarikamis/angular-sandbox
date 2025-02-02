import { Component } from '@angular/core';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrl: './parent-component.component.css'
})
export class ParentComponentComponent {

  // 🔍 Step 1: Default Change Detection (CheckAlways)

  updateParent() {
    this.parentValue = 'Hello'; // This does NOT change the value, but change detection still runs!
  }
  
  parentValue!: string;
}
