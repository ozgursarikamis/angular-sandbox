import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000/');
  }

  connect(): void {
    if (!this.socket) {
      this.socket = io('http://localhost:3000');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      // this.socket =
    }
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  onMessage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('message', (data: string) => {
        observer.next(data);
      });
    });
  }

  onConnect(): Observable<void> {
    return new Observable<void>(observer => {
      this.socket.on('connect', () => {
        observer.next();
      });
    });
  }

  onDisconnect(): Observable<void> {
    return new Observable<void>(observer => {
      this.socket.on('disconnect', () => {
        observer.next();
      });
    });
  }
}
