import { Component, OnInit } from '@angular/core';
// import { ChatShowcaseService } from './chat-showcase.service';
import { SignalRService } from '../_services/SignalR.service';
import { Message } from '../_models/Message';
import { TextMessage } from '../_models/TextMessage';

@Component({
  selector: 'app-chat-ui',
  templateUrl: './chat-ui.component.html',
  styleUrls: ['./chat-ui.component.css']
})
export class ChatUiComponent implements OnInit {

  messages: any[] = [];
  public currentMessage: Message;
    public allMessages: Message;
    public canSendMessage: boolean;

  ngOnInit() {
  }
  // protected chatShowcaseService: ChatShowcaseService
  // tslint:disable-next-line: variable-name
  constructor(private _signalRService: SignalRService) {
    // this.messages = this.chatShowcaseService.loadMessages();
    // this can subscribe for events
    this.subscribeToEvents();
    // this can check for conenction exist or not.
    this.canSendMessage = _signalRService.connectionExists;
    // this method call every second to tick and respone tansfered to client.
    /*setInterval(() => {
        this._signalRService.sendMessage(this.currentMessage);
    }, 1000);*/
  }

  private subscribeToEvents(): void {
    // if connection exists it can call of method.
    this._signalRService.connectionEstablished.subscribe(() => {
        this.canSendMessage = true;
    });
    // finally our service method to call when response received from server event
    // and transfer response to some variable to be shwon on the browser.
    this._signalRService.messageReceived.subscribe((message: TextMessage) => {
      console.log('Message from Bot:', message);
      this.messages.push({
        text: message.Text,
        date: new Date(),
        reply: false,
        type: '',
        user: {
          name: 'Bot',
          avatar: 'https://i.gifer.com/no.gif',
        },
      });
    });
}

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.currentMessage = new Message(new Date().toString(), 'request', event.message, false);
    this._signalRService.sendMessage(this.currentMessage);

    console.log('Sending message:' , event.message);
    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files,
      user: {
        name: 'You',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });

  }

}
