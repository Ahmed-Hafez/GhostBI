import { Server } from './../../../shared/server';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServerMessage } from 'src/app/shared/server-message';
import { Observable, Subscription, timer } from 'rxjs';
import { first } from 'rxjs/operators';
import { ServerService } from 'src/app/services/server.service';

const SAMPLE_SERVERS = [
  { id: 1, name: 'dev-web', isOnline: true },
  { id: 2, name: 'dev-mail', isOnline: false },
  { id: 2, name: 'dev-mail', isOnline: false },
  { id: 2, name: 'dev-mail', isOnline: false },
  { id: 2, name: 'dev-mail', isOnline: false },
  { id: 2, name: 'dev-mail', isOnline: false },
  { id: 2, name: 'dev-mail', isOnline: false },
  { id: 3, name: 'prod-web', isOnline: true },
  { id: 4, name: 'prod-mail', isOnline: true }
];

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.scss']
})
export class SectionHealthComponent implements OnInit, OnDestroy {

  constructor(private serverService: ServerService) { }

  servers: Server[];
  timerSubscription: Subscription;

  ngOnInit() {
    this.refreshData();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  refreshData() {
    this.serverService.getServers().subscribe(res => {
      this.servers = res;
    });

    this.subscribeToData();
  }

  subscribeToData() {
    this.timerSubscription = timer(5000).pipe(
      first()
    ).subscribe(() => this.refreshData());
  }

  sendMessage(msg: ServerMessage) {
    this.serverService.handleServerMessage(msg)
      .subscribe(res => console.log('Message sent to server:', msg),
                 err => console.log('Error:', err));
  }

}
