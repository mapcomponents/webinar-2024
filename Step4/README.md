# MapComponents Webseminar 2024
#### <div align="right"> [Home](https://github.com/mapcomponents/webinar-2024)</div>

## Step 4

Hier wird eine neue Layer-Komponente zum Laden die Rettungspunkte im Projektbereich erzeugt.

#### OSM Daten

Die Daten werden mithilfe von Overpass-turbo aus OpenStreetMap durch die Overpass API. Dafür werden wir folgende Query durchführen: 

```
[out:json][timeout:25];
// gather results
node["highway"="emergency_access_point"]({{bbox}});
// print results
out geom;
```
Die Daten können wir unten *public/sources* auf einer mit den .osm Extension Datei speichern. 


#### OSMLayer Komponnente
Wir erstellen zunächst eine neue Datei mit dem Namen OSMLayer.jsx (oder .tsx für TypeScript) und definieren die Grundstruktur: 
```
export default function OSMLayer() {
  return(
    <>
    </>
  )
  }
```
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
Weitere Informationen zu den Optionen sind in der Dokumentation der Bibliothek *osm2geojson-lite* zu finden: https://github.com/tibetty/osm2geojson-lite
Da die Optionen über eine URL an die Funktion übergeben werden, wandeln wir sie in einen String um und kodieren sie als gültigen Uniform Resource Identifier (URI): 
```
const optionsURL = "?" +  encodeURI(JSON.stringify(osmOptions));

//Output: ?%7B%22completeFeature%22%3Atrue%2C%22renderTagged%22%3Afalse%2C%22excludeWay%22%3Atrue%7D=

```

#### Layer erstellen
Jetzt können wir den Layer zu unserer Karte hinzufügen. Wir verwenden die Komponente MlGeoJsonLayer von MapComponents, da das Protokoll die Daten in eine Geojson-Datei umwandelt. 
```
return (
    <>
      <MlGeoJsonLayer
        layerId={"osm-rettung"}
        type="circle"
        options={{
          source: {
            type: "geojson",
            data: "osm://sources/schauinsland.osm" + optionsURL,
          },
          paint: { "circle-opacity": 0.8 },          
        }}
        labelProp="ref"        
      />
    </>
  );
```

In den Optionen haben wir unter *source.data* die URL eingegeben, die vom ProtocolHandler verwendet werden soll. Diese Url setzt sich zusammen aus:
- dem Namen des Protokolls (identisch mit dem, den wir mit dem Hook useAddProtocol registriert haben), 
- `://`
- dem Pfad zu der Datei, die die Daten enthält, einschließlich ihrer Extension (in unserem Fall befindet sich die Datei in *public/sources/* , aber der Inhalt von *public* wird in das Rootverzeichnis verschoben, wenn ein Build des Projekts ausgeführt wird, daher haben wir ihn in der Url weggelassen)
- Die Optionen, die mit einem "?" beginnen und nicht zwingend erforderlich sind (falls nicht vorhanden, wird die Umwandlung mit den Standardwerten durchgeführt).  

Bei der Option *labelProp* verwenden wir "ref", ein Feld, von dem wir wissen, dass es im Properties-Objekt des erstellten Geojson existiert. 


#### Hinzufügen der Komponente zur App

In der Datei App.tsx fügen wir die Komponente hinzu, um den neuen Layer auf der Karte sichtbar zu machen:
```
<>
      <MapLibreMap
       ...
      />  
     <ProjectLayers />
     <OSMLayer />   // hier wir die neue Komponente importiert
    </>

```

#### <div align="right"> [Zu Step5](https://github.com/mapcomponents/webinar-2024/tree/main/Step5#step-5)</div>
