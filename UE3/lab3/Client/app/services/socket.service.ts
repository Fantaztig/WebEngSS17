/* created by Paul Proell */

import { Injectable } from '@angular/core';
import { Subject, Observer, Observable } from 'rxjs/Rx';
@Injectable()
export class SocketService{

  private socket: Subject<any> = null;

    constructor() {
        this.socket = this.createSocket();
    }

    private createSocket(): Subject<MessageEvent> {
        let socket = new WebSocket("ws://localhost:8081/");
        let observable = Observable.create((observer: Observer<MessageEvent>) => {
            socket.onmessage = observer.next.bind(observer);
            socket.onerror = observer.error.bind(observer);
            socket.onclose = observer.complete.bind(observer);
            return socket.close.bind(socket);
        });
        let observer = {
            next: (data: Object) => {
                let interval = setInterval(function(){
                    if(socket.readyState === WebSocket.OPEN) {
                        socket.send(JSON.stringify(data));
                        clearInterval(interval);
                    }
                })
            }
        };
        return Subject.create(observer, observable);
    }

    public getConnection(): Subject<MessageEvent> {
        return this.socket;
    }

    public send(msg: Object) {
        this.socket.next(msg);
    }
}
