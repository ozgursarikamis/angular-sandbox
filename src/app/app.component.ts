import { Component, ElementRef, inject, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { SocketService } from "./services/socket.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy {

  // Other properties and methods remain unchanged
  @ViewChildren('messageItem') messageItems!: QueryList<ElementRef>;
  private renderer: Renderer2 = inject(Renderer2);

  title = undefined;
  socketService: SocketService = inject(SocketService);
  newMessage: string = '';
  messages: string[] = [];

  private messageSubscription!: Subscription;
  private connectSubscription!: Subscription;
  private disconnectSubscription!: Subscription;

  ngOnInit() {
    this.socketService.connect();

    this.connectSubscription = this.socketService.onConnect().subscribe(x => {
      console.log('Connected to WebSocket server');
    });

    this.messageSubscription = this.socketService.onMessage().subscribe(message => {
      this.messages.push(message);

      // Wait for the DOM to update, then apply the flash effect
      setTimeout(() => {
        const lastItem = this.messageItems.first;
        if (lastItem) {
          this.renderer.addClass(lastItem.nativeElement, 'flash');
          setTimeout(() => {
            this.renderer.removeClass(lastItem.nativeElement, 'flash');
          }, 500); // Match the duration of the animation
        }
      });
    });

    this.disconnectSubscription = this.socketService.onDisconnect().subscribe(x => {
      console.log('Disconnected from WebSocket server');
    });
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    if (this.connectSubscription) {
      this.connectSubscription.unsubscribe();
    }
    if (this.disconnectSubscription) {
      this.disconnectSubscription.unsubscribe();
    }
    this.socketService.disconnect();
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.socketService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}
