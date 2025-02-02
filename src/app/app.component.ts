import { AfterViewChecked, Component, DoCheck, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';

// ==== Why Use ngAfterViewChecked() Here? ====
// Every time Angular adds a new message, the view updates.
// The hook detects these updates and scrolls to the bottom only when needed.
// ngAfterViewInit() wouldn’t work because the messages change after the view is initialized.

// It gets called after every change detection cycle, so you must optimize it to avoid performance issues 
// (e.g., avoid making API calls or triggering new change detections).

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked, OnInit, DoCheck {
  title = 'ngAfterViewChecked';
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChildren('message') messageElements!: ElementRef[];
  private previousMessageCount = 0;
  messages: string[] = ['Hello!', 'How are you?', 'I am fine!'];

  ngOnInit(): void {
    console.log(this.messagesContainer);
    console.log(this.messageElements);
    this.styleContainer();
  }
  ngDoCheck(): void {
    console.log('DoCheck');
  }
  
  ngAfterViewChecked(): void {
    console.log(this.messagesContainer);
    console.log(this.messageElements);
    this.styleContainer();
    if (this.messages.length !== this.previousMessageCount) {
      this.previousMessageCount = this.messages.length;
      this.scrollToBottom();
      this.previousMessageCount = this.messages.length;
    }
  }

  scrollToBottom() {
    const container = this.messagesContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  addMessage(message: string) {
    this.messages.push(message);
  }

  styleContainer() {
    this.messagesContainer.nativeElement.style.border = '1px solid red';
  }
}
