# MapComponents Webseminar 2024

## Step 2


Legen wir nun eine zweite Ebene auf der Karte an. Aber dieses Mal werden wir eine csv-Datei als Quelle verwenden. Dabei handelt es sich um eine Tabelle, die die Spalten "latitude" und "longitude" mit den Koordinaten enthält, die einer Serie von Punkten entsprechen. Die Datei befindet sich in den Ordner *public/sources/*. 


#### CSVProtocolHandler
MapLibre hat keine direkte Unterstützung für Dateien in CSV Format. In diesem Fall müssen die Daten in ein Format umgewandelt werden, mit dem wir arbeiten können. 
Seit der Version 0.1.81 bietet MapComponents einen Hook an, der useAddProtocol, der es uns erlaubt, diesen Prozess auf einfachste Weise durchzuführen. Darüber hinaus enthält die Bibliothek Funktionen (ProtocolHandlers) zur Umwandlung einiger häufig verwendeter Formate im GIS-Bereich, wie CSV, OSM, Topojson und einige XML-Varianten.
In diesem Fall importieren wir den CSVrotocolHandler aus MapComponents zusammen mit dem useAddProtocol Hook:

```
import { useAddProtocol, OSMProtocolHandler } from "@mapcomponents/react-maplibre";

```
Und wir fügen den Hook zur Komponente hinzu, vor den Return Statement:

```
  useAddProtocol({
    protocol: "csv",
    handler: CSVProtocolHandler,
  });  
  ```
Sobald das Protokoll registriert ist wird MapLibre die angegebene Funktion (CSVProtocolHandler) verwenden, um die Originaldatei in eine Geojson-Datei umzuwandeln, wenn einer Quelle das "csv"-Protokoll vorangestellt ist. Auf diese Weise können wir die Datei in die Karte laden, wie wir es in Schritt 1 mit unserer geojson-Datei getan haben.

#### Layer erstellen

Wir fügen einen neuen MlGeojsonLayer hinzu, aber dieses Mal verwenden wir nicht das Property *geojson*, sondern fügen die Quelle unter dem Key *source* im Options-Objekt hinzu. 

```
  <MlGeoJsonLayer
        layerId="samples"
        type="circle"
        options={{
          source: {
            type: "geojson",
            data: "csv://sources/samples.csv",
          },
          paint: {
            "circle-color": "#22BB5D",
            "circle-stroke-width": 1,
          },
        }}
 ```

 Dieses Source-Objekt hat zwei Eigenschaften: erstens  *type*, der sich auf den vom protocolHandler zurückgegebenen Dateityp bezieht, und zweitens *data*, was in diesem Fall eine URL ist. Diese Url setzt sich zusammen aus:
- dem Namen des Protokolls (identisch mit dem, den wir mit dem Hook useAddProtocol registriert haben), 
- `://`
- dem Pfad zu der Datei, die die Daten enthält, einschließlich ihrer Extension (in unserem Fall befindet sich die Datei in *public/sources/* , aber der Inhalt von *public* wird in das Rootverzeichnis verschoben, wenn ein Build des Projekts ausgeführt wird, daher haben wir ihn in der Url weggelassen)

#### CSVProtocolHandler optionen
Die in Mapcomponents enthaltene Funktion CSVProtocolHandler bietet die Möglichkeit, einige Optionen anzugeben, um zu steuern, wie die Datei gelesen werden soll. Diese Optionen sind: 
- **latfield**: der Name des Feldes in der Tabelle, in dem sich der Breitengradwert befindet. Die Funktion kann es automatisch lesen, wenn es den Namen "latitude" oder "lat" trägt oder eines von beiden enthält. 
-	**lonfield**: wie bei der vorherigen Option;
-	**delimiter**: erlaubt es den Benutzern, das Zeichen festzulegen, das in der Datei zur Trennung der Spalten verwendet wird, falls es sich nicht um ein Komma handelt. 

Ein Beispiel für die Umsetzung der Optionen befindet sich unter: https://mapcomponents.github.io/react-map-components-maplibre/?path=/story/hooks-useaddprotocol--csv-with-options


#### Layer Gestalltung
Um die Visualisierung zu verbessern, haben wir dem Layer einige Designdefinitionen hinzugefügt. Letztendlich ist der Layer wie folgt definiert: 
 ```
      <MlGeoJsonLayer
        layerId="samples"
        type="circle"
        options={{
          source: {
            type: "geojson",
            data: "csv://sources/samples.csv",
          },
          paint: {
            "circle-color": "#22BB5D",
            "circle-stroke-width": 1,
          },
        }}
        labelProp="id"
        labelOptions={{
          layout: {
            "text-size": {
              stops: [
                [13, 15],
                [22, 60],
              ],
            },
          },
          minzoom: 13,
        }}
      />
 ```

