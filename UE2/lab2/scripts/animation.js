/*
  TODO
 Implementieren Sie die folgenden Funktionen um die SVG-Grafiken der Geräte anzuzeigen und verändern.

 Hinweise zur Implementierung:
 - Verwenden Sie das SVG-Plugin für jQuery, welches bereits für Sie eingebunden ist (Referenz: http://keith-wood.name/svg.html)
 - Sie dürfen das Bild bei jedem Funktionenaufruf neu laden und Ihre Veränderungen vornehmen;
 Tipp: Durch Überschreiben der OnLoad Funktion von svg.load() können Sie die Grafik noch bevor diese zum ersten Mal angezeigt wird verändern
 - In allen bereit gestellten SVG-Grafiken sind alle für Sie relevanten Stellen mit Labels markiert.
 - Da Ihre Grafiken nur beim Laden der Übersichtsseite neu gezeichnet werden müssen, bietet es ich an die draw_image Funktionen nach dem vollständigen Laden dieser Seite auszuführen.
 Rufen Sie dazu mit draw_image(id, src, min, max, current, values) die zugrunde liegende und hier definierte Funktione auf.
 */


function drawThermometer(id, src, min, max, current, values) {
    /* TODO
     Passen Sie die Höhe des Temperaturstandes entsprechend dem aktuellen Wert an.
     Beachten Sie weiters, dass auch die Beschriftung des Thermometers (max, min Temperatur) angepasst werden soll.
     */
    setTimeout(function() {
        $('#' + id + " > .device-image-container > .device-image").svg({
            loadURL: src,
            onLoad: function(svg) {
                //min => control_units
                $("#tspan3817", svg.root()).text(min[0].min); //min beschriftung
                $("#tspan3817-6", svg.root()).text(min[0].max); //max beschriftung
                var percent = min[0].current / (min[0].max - min[0].min); //wert / range
                if (percent > 1) percent = 1;
                if (percent < 0) percent = 0;
                var length = (323.21899 - 47.718994) * percent;
                var path = svg.createPath();
                svg.path(svg.root(), path.move(254.64, 325).horiz(323).vert(-length, true).horiz(254.64).close(), { fill: 'solid' });
            },
            settings: {},
            initPath: ''
        });
    }, 0);

}

function drawBulb(id, src, min, max, current, values) {
    // TODO
    setTimeout(function() {
        $('#' + id + " > .device-image-container > .device-image").svg({
            loadURL: src,
            onLoad: function(svg) {
                if (min[0].current) {
                    $(svg.root()).css("fill", "orange");
                } else {
                    $(svg.root()).css("fill", "");
                }
            },
            settings: {},
            initPath: ''
        });
    }, 0);
}

function drawCam(id, src, min, max, current, values) {
    /* TODO
      Verändern Sie die Darstellung der Webcam entsprechend den Vorgaben aus der Angabe.
      Dabei soll jedoch nicht nur einfach die Farbe der Elemente verändert werden, sondern es soll eine Kopie der zu verändernden Elemente erstellt
       und anschließend die aktuellen durch die angepassten Kopien ersetzt werden.
     */
    setTimeout(function() {
        $('#' + id + " > .device-image-container > .device-image").svg({
            loadURL: src,
            onLoad: function(svg) {
                var lens = $('#circle8', svg.root()).clone();
                var lensreflect = $('#path10', svg.root()).clone();
                if (min[0].current) {
                    lens.css("fill", "#42A5F5");
                    lensreflect.css("fill", "#90CAF9");
                } else {
                    lens.css("fill", "#000000");
                    lensreflect.css("fill", "#ffffff");
                }
                $('#circle8', svg.root()).replaceWith(lens);
                $('#path10', svg.root()).replaceWith(lensreflect);
            },
            settings: {},
            initPath: ''
        });
    }, 0);
}

function drawShutter(id, src, min, max, current, values) {
    // TODO
    setTimeout(function() {
        $('#' + id + " > .device-image-container > .device-image").svg({
            loadURL: src,
            onLoad: function(svg) {
                $("#path4559-2", svg.root()).css("opacity", "0");
                $("#path4559-2-6", svg.root()).css("opacity", "0");
                $("#path4559-2-5", svg.root()).css("opacity", "0");
                if (min[0].current > 0) {
                    if (min[0].current > 1) {
                        $("#path4559-2-5", svg.root()).css("opacity", "1");
                        $("#path4559-2-6", svg.root()).css("opacity", "1");
                    }
                    $("#path4559-2", svg.root()).css("opacity", "1");
                }
            },
            settings: {},
            initPath: ''
        });
    }, 0);
}