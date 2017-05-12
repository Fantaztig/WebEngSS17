/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */

var express = require('express');
var app = express();
var fs = require("fs");
var expressWs = require('express-ws')(app);
var http = require('http');

var simulation = require('./simulation.js');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var uuid = require('uuid');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

var aWss = expressWs.getWss('/');

var username = "maus";
var password = null;
var devices = null;


//TODO Implementieren Sie hier Ihre REST-Schnittstelle
/* Ermöglichen Sie wie in der Angabe beschrieben folgende Funktionen:
 *  Abrufen aller Geräte als Liste
 *  Hinzufügen eines neuen Gerätes
 *  Löschen eines vorhandenen Gerätes
 *  Bearbeiten eines vorhandenen Gerätes (Verändern des Gerätezustandes und Anpassen des Anzeigenamens)
 *  Log-in und Log-out des Benutzers
 *  Ändern des Passworts
 *  Abrufen des Serverstatus (Startdatum, fehlgeschlagene Log-ins).
 *
 *  BITTE BEACHTEN!
 *      Verwenden Sie dabei passende Bezeichnungen für die einzelnen Funktionen.
 *      Achten Sie bei Ihrer Implementierung auch darauf, dass der Zugriff nur nach einem erfolgreichem Log-In erlaubt sein soll.
 *      Vergessen Sie auch nicht, dass jeder Client mit aktiver Verbindung über alle Aktionen via Websocket zu informieren ist.
 *      Bei der Anlage neuer Geräte wird eine neue ID benötigt. Verwenden Sie dafür eine uuid (https://www.npmjs.com/package/uuid, Bibliothek ist bereits eingebunden).
 */

app.post("/updateCurrent", function (req, res) {
    "use strict";
    //TODO Vervollständigen Sie diese Funktion, welche den aktuellen Wert eines Gerätes ändern soll
    /*
     * Damit die Daten korrekt in die Simulation übernommen werden können, verwenden Sie bitte die nachfolgende Funktion.
     *      simulation.updatedDeviceValue(device, control_unit, Number(new_value));
     * Diese Funktion verändert gleichzeitig auch den aktuellen Wert des Gerätes, Sie müssen diese daher nur mit den korrekten Werten aufrufen.
     */
});

app.post("/auth", function(req, res) {
    var credentials = req.body;
    if(app.settings.username == credentials.username && app.settings.password == credentials.password) {
        jwt.sign({ foo: 'bar' }, 'secret', {}, function(err, token) {
            if(err) {
                console.error(err);
            }
            res.json({
                token: token
            })
        });
    } else {
        res.status(403).end();
    }
})

app.post("/me/change_password", function(req, res) {
    var passwords = req.body;
    var auth_header = req.get('Authentication');
    var token = auth_header.split(" ")[1];
    console.log(passwords);
    jwt.verify(token, 'secret', function(err, decoded) {
        if(err) {
            console.error(err);
            res.status(401).json({
                status: "unauthorized"
            })
        } else {
            if(passwords.old_password == app.settings.password && passwords.new_password == passwords.repeat_password) {
                app.set('password', passwords.new_password);
                res.json({
                    status: "ok"
                })
                console.log("dsfasd")
            } else {
                res.status(422).json({
                    status: "failed"
                })
            }
        }
    })
})

function readUser() {
    "use strict";
    //TODO Lesen Sie die Benutzerdaten aus dem login.config File ein.
    fs.readFile('./resources/login.config', {encoding: 'utf-8'},function(err, data) {
        var lines = data.split("\r\n");
        app.set('username', lines[0].split(": ")[1]).toString().trim();
        app.set('password', lines[1].split(": ")[1]).toString().trim();
    });
}

function readDevices() {
    "use strict";
    //TODO Lesen Sie die Gerätedaten aus der devices.json Datei ein.
    /*
     * Damit die Simulation korrekt funktioniert, müssen Sie diese mit nachfolgender Funktion starten
     *      simulation.simulateSmartHome(devices.devices, refreshConnected);
     * Der zweite Parameter ist dabei eine callback-Funktion, welche zum Updaten aller verbundenen Clients dienen soll.
     */
    fs.readFile('./resources/devices.json', {encoding: 'utf-8'},function(err, data) {
        devices = JSON.parse(data);
        simulation.simulateSmartHome(devices.devices, refreshConnected);
    });
}


function refreshConnected() {
    "use strict";
    //TODO Übermitteln Sie jedem verbundenen Client die aktuellen Gerätedaten über das Websocket
    /*
     * Jedem Client mit aktiver Verbindung zum Websocket sollen die aktuellen Daten der Geräte übermittelt werden.
     * Dabei soll jeder Client die aktuellen Werte aller Steuerungselemente von allen Geräte erhalten.
     * Stellen Sie jedoch auch sicher, dass nur Clients die eingeloggt sind entsprechende Daten erhalten.
     *
     * Bitte beachten Sie, dass diese Funktion von der Simulation genutzt wird um periodisch die simulierten Daten an alle Clients zu übertragen.
     */
    aWss.clients.forEach(function (client) {
      client.send(JSON.stringify(devices));
    });
}


var server = app.listen(8081, function () {
    "use strict";
    readUser();
    readDevices();

    var host = server.address().address;
    var port = server.address().port;
    console.log("Big Smart Home Server listening at http://%s:%s", host, port);
});

