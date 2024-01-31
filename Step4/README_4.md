# MapComponents Webseminar 2024

## Step 4

Hier wird eine neue Layer-Komponente zum Laden die Rettungspunkte im Projekt Bereich erzeugt.

#### OSM Daten

Die Daten werden mit Hilfe von Overpass-turbo aus OpenStreetMap durch den Overpass API. Dafür werden wir folgende Query durchführen: 

```
[out:json][timeout:25];
// gather results
node["highway"="emergency_access_point"]({{bbox}});
// print results
out geom;
```
Die Daten können wir unten "public/sources" auf einer mit den .osm Extension Datei speichern. 

#### OSMProtocolHandler
Genau wie in Schritt 2 registrieren wir das Protokoll zusammen mit der Funktion, die uns die Verwendung dieser Daten ermöglicht. In diesem Fall importieren wir aus MapComponents den OSMProtocolHandler zusammen mit dem Hook useAddProtocol:

```
import { useAddProtocol, OSMProtocolHandler } from "@mapcomponents/react-maplibre";
```
Und wir fügen den Hook zur Komponente hinzu:

```
  useAddProtocol({
    protocol: "osm",
    handler: OSMProtocolHandler,
  });
  ```

#### Optionen Objekt
Die Funktion OSMProtocolHandler ist für die Umwandlung der Daten aus dem Format, in dem sie über die Overpass-API empfangen werden, in ein Standard-Geojson-Format zuständig, das wir in unserer Kartenanwendung verwenden können. Zusätzlich bietet die Funktion dem Benutzer eine Reihe von Optionen, die festlegen, wie die Daten umgewandelt werden sollen. Um die Optionen zu nutzen, erstellen wir zunächst eine Konstante in unserem Code:

```
const osmOptions = {
  completeFeature: true,
  renderTagged: false,
  excludeWay: true
};
```
Weitere Informationen zu den Optionen sind der Dokumentation der Bibliothek osm2geojson-lite zu finden: https://github.com/tibetty/osm2geojson-lite


```
?%7B%22completeFeature%22%3Atrue%2C%22renderTagged%22%3Afalse%2C%22excludeWay%22%3Atrue%7D=

```


const optionsURL = "?" + new URLSearchParams(JSON.stringify(osmOptions));

#### Layer erstellen

