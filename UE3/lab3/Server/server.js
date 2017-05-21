/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */

var express = require('express');
var app = express();
var fs = require("fs");
var expressWs = require('express-ws')(app);
var http = require('http');
var apiRouter = express.Router();
const WebSocket = require('ws');

var simulation = require('./simulation.js');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var uuid = require('uuid');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',apiRouter);

var aWss = expressWs.getWss();

var username = null;
var password = null;
var devices = null;

var connections = [];
var expiredTokens = [];
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
apiRouter.use(function(req, res, next) {

  // check authorization header
  var token = req.headers['authorization'].split(" ")[1];

  // decode token
	if (token && !expiredTokens.includes(token)) {
		
		jwt.verify(token, 'secret', function(err, decoded) {      
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });    
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;  
				return next();
			}
		});
		
	}else{
    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
	}
  
});

app.ws('/', function(ws, req) {


    ws.on('connection',function(){
        connections.push(ws);
        console.log('A client connected!');
    });

  ws.on('message', function(msg) {
     // TODO Token verifify


  });
    console.log("Current number of clients: " + connections.length);
});


apiRouter.post("/updateCurrent", function (req, res) {
    "use strict";
    //TODO Vervollständigen Sie diese Funktion, welche den aktuellen Wert eines Gerätes ändern soll
    /*
     * Damit die Daten korrekt in die Simulation übernommen werden können, verwenden Sie bitte die nachfolgende Funktion.
     *      simulation.updatedDeviceValue(device, control_unit, Number(new_value));
     * Diese Funktion verändert gleichzeitig auch den aktuellen Wert des Gerätes, Sie müssen diese daher nur mit den korrekten Werten aufrufen.
     */
	 var data = JSON.parse(req.body);
	 for(var i = 0; i < devices.legnth; i++){
		 if(devices[i].id === data.id){
			 simulation.updateDeviceValue(devices[i], data.control_unit, Number(data.new_value));
			 res.json({
                    status: "ok"
                });
		 }
	 }
	 res.status(400).json({
		 status: "device not found"
	 });
});

apiRouter.post("/devices" , function (req, res){
	var data = req.body;
    data.id = uuid();
    switch(data.control_units[0].type) {
        case 0:
            data.control_units[0].type = "boolean";
            break;
        case 1:
            data.control_units[0].type = "enum";
            break;
        case 2:
            data.control_units[0].type = "continuous";
            break;
    }
	devices['devices'].push(data);
    broadcast({
        action:"added",
        device:data
    })
	res.status(200).json(data);
});

apiRouter.get("/devices" , function (req, res){
	if(devices == null){
		res.status(500).end;
	} else {
		res.end( JSON.stringify(devices));
	}
});

apiRouter.get("/devices/:uuid" , function (req, res){
	var uuid = req.params.uuid;
	 for(var i = 0; i < devices["devices"].length; i++){
		 if(devices["devices"][i].id == uuid){
			 return res.json(devices["devices"][i]);
		 }
	 }
	 res.status(400).json({
		 status: "device not found"
	 });
});

apiRouter.delete("/devices/:uuid" , function (req, res){
	var uuid = req.params.uuid;
    console.log("Delete device with id " + uuid);
	 for(var i = 0; i < devices["devices"].length; i++){
		 if(devices["devices"][i].id == uuid){
			 devices["devices"].splice(i,1);
             broadcast({
                 action: "delete",
                 device: uuid
             });
			 return res.status(200).json({
                    status: "ok"
                });
		 }
	 }
	 res.status(400).json({
		 status: "device not found"
	 });
});

apiRouter.put("/devices/:uuid" , function (req, res){
    "use strict";

    var uuid = req.params.uuid;
    var data = req.body.device;
    var diagramData = req.body.diagram;
    for (var i = 0; i < devices.devices.length; i++) {
        if (devices.devices[i].id === uuid) {
            Object.assign(devices.devices[i], data);
            broadcast({
                action: "change",
                device: uuid,
                device_object: data,
                diagram: diagramData
            });
            return res.status(200).json({
                success: true
            });
        }
    }
    res.status(400).json({
        success: false
    });
});

apiRouter.get("/status" , function(req, res){
	//TODO Startzeit und failed logins speichern!
	res.status(200).json({
		server_start : new Date(),
		failed_logins : "0"
	});
});

app.post("/auth", function(req, res) {
    var credentials = req.body;
    if(app.settings.username == credentials.username && app.settings.password == credentials.password) {
        jwt.sign({ foo: 'bar' }, 'secret', {}, function(err, token) {
            if(err) {
                console.error(err);
                res.status(403);
            } 
			console.log("User logged in, returning token: " + token);
            res.json({
                token: token
            })
        });
    } else {
        res.status(403).end();
    }
})

app.get("/logout", function(req, res){
	var token = req.headers['authorization'].split(" ")[1];

  // decode token
  if (token && !expiredTokens.includes(token)) {
	  expiredTokens.push(token);
  }
	
})

apiRouter.post("/me/change_password", function(req, res) {
    var passwords = req.body;
    if(passwords.old_password == app.settings.password && passwords.new_password == passwords.repeat_password) {
        app.set('password', passwords.new_password);
        writeUser(function(){
            res.json({
                status: "ok"
            })
        })
    } else {
        res.status(422).json({
            status: "failed"
        })
    }
})

function broadcast(msg) {
    var clients = aWss.clients
    clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(msg));
        }
    });
}

function readUser() {
    "use strict";
    //TODO Lesen Sie die Benutzerdaten aus dem login.config File ein.
    fs.readFile('./resources/login.config', {encoding: 'utf-8'},function(err, data) {
        var lines = data.split("\r\n");
        app.set('username', lines[0].split(": ")[1]).toString().trim();
        app.set('password', lines[1].split(": ")[1]).toString().trim();
    });
}

function writeUser(callback) {
    fs.writeFile("./resources/login.config", "username: " + app.get('username') + "\r\npassword: " + app.get("password"), function(err) {
        if(err) {
            return console.log(err);
        }

        callback();
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
    /*aWss.clients.forEach(function (client) {
      client.send(JSON.stringify(devices));
    });*/

    connections.forEach(function (entry) {
        if (entry.readyState === entry.OPEN) {

            var sendMessage = "simulation";

           // entry.send(sendMessage);
            entry.send(JSON.stringify(devices));

        } else {
            var index = connections.indexOf(entry);
            if (index > -1) {
                connections.splice(index, 1);
            }
            console.log("Removed client. Current number of clients: " + connections.length);
        }
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

