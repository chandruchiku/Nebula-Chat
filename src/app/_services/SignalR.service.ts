import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { Message } from '../_models/Message';
import { TextMessage } from '../_models/TextMessage';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  // Declare the variables
  private proxy: any;
  private proxyName = 'webChatHub';
  private connection: any;
  // create the Event Emitter
  public messageReceived: EventEmitter < Message > ;
  public connectionEstablished: EventEmitter < boolean > ;
  public connectionExists: boolean;
  public message: TextMessage;

  constructor() {
      // Constructor initialization
      this.connectionEstablished = new EventEmitter < boolean > ();
      this.messageReceived = new EventEmitter < Message > ();
      this.connectionExists = false;
      // create hub connection
      this.connection = $.hubConnection(environment.baseUrls.server);
      this.connection.qs = { 'ApplicationID': 'HRBot' };
      // create new proxy as name already given in top
      this.proxy = this.connection.createHubProxy(this.proxyName);
      console.log(this.proxy);
      // register on server events
      this.registerOnServerEvents();
      // call the connecion start method to start the connection to send and receive events.
      this.startConnection();
  }

  // method to hit from client
  public sendMessage(message: Message) {
      // server side hub method using proxy.invoke with method name pass as param
      this.message = new TextMessage(message.message);
      this.proxy.invoke('request', this.message);
  }
  // check in the browser console for either signalr connected or not
  private startConnection(): void {
      this.connection.start().done((data: any) => {
          console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
          this.connectionEstablished.emit(true);
          this.connectionExists = true;
      }).fail((error: any) => {
          console.log('Could not connect ' + error);
          this.connectionEstablished.emit(false);
      });
  }
  private registerOnServerEvents(): void {

      this.proxy.on('response', (data: Message) => {
        console.log('response received in SignalRService: ' + JSON.stringify(data));
        this.messageReceived.emit(data);
      });
  }

}
