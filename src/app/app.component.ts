import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnDestroy {
  private worker: Worker | undefined;
  title = undefined;
  buttonDisabled = false;
  heapSize = '0';

  constructor() {
    if (typeof Worker !== 'undefined') {
      // Create the worker using a relative URL
      this.worker = new Worker(new URL('./app.worker', import.meta.url));
    }
  }

  doHeavyTask(sizeInMb: number) {
    this.buttonDisabled = true;
    if (!this.worker) return;

    // 1. Allocate memory (8 bytes per Float64)
    // const numElements = (sizeInMb * 1024 * 1024) / 8;
    const buffer = new ArrayBuffer(sizeInMb * 1024 * 1024);
    const view = new Float64Array(buffer);

    // Fill with dummy data
    for (let i = 0; i < view.length; i++) view[i] = i;

    console.log(`Main thread memory before transfer: ${this.getHeapSize()} MB`);
    this.heapSize = this.getHeapSize();

    // 2. Transfer to Worker (Zero-copy)
    // After this line, 'buffer' is inaccessible (neutered) in the main thread
    this.worker.postMessage(buffer, [buffer]);

    this.worker.onmessage = ({ data }) => {
      console.log('Work finished. Memory transferred back.', data);
      // 'data' is now the same ArrayBuffer, back in the main thread.
      this.buttonDisabled = false;
    };
  }

  getHeapSize() {
    return ((performance as any).memory?.usedJSHeapSize / 1048576).toFixed(2);
  }

  ngOnDestroy() {
    this.worker?.terminate(); // Crucial for manual memory cleanup
  }
}
