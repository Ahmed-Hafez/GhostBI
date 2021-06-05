import { Server } from './../../shared/server';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  @Input() server: Server;
  color: string;
  buttonText: string;

  constructor() { }

  ngOnInit(): void {
    this.setServerStatus(this.server.isOnline);
  }

  setServerStatus(isOnline: boolean) {
    if (isOnline) {
      this.server.isOnline = true;
      this.color = '#66BB6A',
      this.buttonText = 'Shut Down';
    } else {
      this.server.isOnline = false;
      this.color = '#FF6B6B';
      this.buttonText = 'Start';
    }
  }

  toggleStatus(onlineStatus: boolean){
    console.log(this.server.name, ':', onlineStatus);
    this.setServerStatus(!this.server.isOnline);
  }

}
