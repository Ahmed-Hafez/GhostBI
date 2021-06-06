import { Server } from './../../shared/server';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServerMessage } from 'src/app/shared/server-message';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  @Input() server: Server;
  color: string;
  buttonText: string;
  serverStatus: string;
  isLoading: boolean;
  @Output() serverAction = new EventEmitter<ServerMessage>();

  constructor() { }

  ngOnInit() {
    this.setServerStatus(this.server.isOnline);
  }

  setServerStatus(isOnline: boolean) {
    if (isOnline) {
      this.server.isOnline = true;
      this.serverStatus = 'Online';
      this.color = '#66BB6A',
      this.buttonText = 'Shut Down';
    } else {
      this.server.isOnline = false;
      this.serverStatus = 'Offline';
      this.color = '#FF6B6B';
      this.buttonText = 'Start';
    }
  }

  makeLoading() {
    this.color = '#FFCA28';
    this.buttonText = 'Pending...';
    this.isLoading = true;
    this.serverStatus = 'Loading';
  }

  sendServerAction(isOnline: boolean) {
    console.log('sendServerAction called!');
    this.makeLoading();
    const payload = this.buildPayload(isOnline);
    this.serverAction.emit(payload);
  }

  buildPayload(isOnline: boolean): ServerMessage {
    if (isOnline) {
      return {
        id: this.server.id,
        payload: 'deactivate'
      };
    } else {
      return {
        id: this.server.id,
        payload: 'activate'
      };
    }
  }
}
