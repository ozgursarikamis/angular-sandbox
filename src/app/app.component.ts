import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from "./services/socket.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
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
