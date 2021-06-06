import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ServerMessage } from '../shared/server-message';
import { Server } from '../shared/server';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    });
  }

  getServers(): Observable<Server[]> {
    return this.http.get<Server[]>('http://localhost:5000/api/server').pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.log(errMsg);
    return throwError(errMsg);
  }

  handleServerMessage(msg: ServerMessage): Observable<Response> {
    const url = 'http://localhost:5000/api/server/' + msg.id;
    return this.http.put<Response>(url, msg, {
      headers: this.headers
    });
  }

}
