/* created by Paul Proell */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var SocketService = (function () {
    function SocketService() {
        this.socket = null;
        this.socket = this.createSocket();
    }
    SocketService.prototype.createSocket = function () {
        var socket = new WebSocket("ws://localhost:8081/");
        var observable = Rx_1.Observable.create(function (observer) {
            socket.onmessage = observer.next.bind(observer);
            socket.onerror = observer.error.bind(observer);
            socket.onclose = observer.complete.bind(observer);
            return socket.close.bind(socket);
        });
        var observer = {
            next: function (data) {
                var interval = setInterval(function () {
                    if (socket.readyState === WebSocket.OPEN) {
                        socket.send(JSON.stringify(data));
                        clearInterval(interval);
                    }
                });
            }
        };
        return Rx_1.Subject.create(observer, observable);
    };
    SocketService.prototype.getConnection = function () {
        return this.socket;
    };
    SocketService.prototype.send = function (msg) {
        this.socket.next(msg);
    };
    SocketService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SocketService);
    return SocketService;
}());
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map