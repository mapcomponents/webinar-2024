# MapComponents Webseminar 2024 
#### <div align="right"> [Home](https://github.com/mapcomponents/webinar-2024)</div>

## Step 1 


#### Allgemeine Einstellungen der Karte
Beim Starten der Anwendung, die auf der MapComponents-Template basiert, ist bereits eine Instanz von MapLibre in dieser vorhanden. In der Datei *App.tsx* im Ordner *src* sehen wir die Komponente, die sie startet. 
Um unsere Anwendung an der gewünschten Kartenposition zu starten, müssen wir die Werte der Optionen *zoom* und *center* wie folgt ändern: 

```
 <MapLibreMap
        options={{
          style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
          zoom: 12,
          center:[ 7.890701768202916, 47.91767470935818]
        }}
         style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />
```
Auf diese Weise beginnt unsere App mit der Zoomstufe 12 und ist auf einen Punkt zentriert, an dem die Daten, die wir anzeigen wollen, sichtbar sind. 

#### ProjectLayer Komponnente
Wir erstellen zunächst einen neuen Ordner in den *src* Verzeichnis, den wir *Layers* nennen. In das Verzeichnis legen wir unsere geojson Datei. In diesem Beispiel heißt die Datei "monitoringAreas". Damit wir sie in die React-App importieren können, erhält die Datei die Erweiterung .json.  

Auch im *Layers* stellen wir eine neue Datei mit dem Namen ProjectLayer.jsx (oder .tsx für TypeScript) und definieren die Grundstruktur: 

```
export default function ProjectLayer() {
  return(
    <>
    </>
  )
  }
```

#### GeoJson import und Layer erstellen
Zunächst importieren wir die Datei in unsere neue Komponente: 

```
import monitoringAreas from "./monitoringAreas.json";
```

Und wir erstellen den ersten Layer im Return Statement: 

```
return (
    <>
      <MlGeoJsonLayer
        geojson={monitoringAreas}  
      />
    </>
  );
```

#### Hinzufügen der Komponente zur App

Diese wenigen Codezeilen reichen aus, um die Daten auf der Karte anzuzeigen. Aber zuerst müssen wir die Komponente in unsere *App.tsx* Datei importieren, damit wir sie sehen können:

```
import ProjectLayers from "./Layers/ProjectLayers";
```

```
<>
      <MapLibreMap
       ...
      />  
     <ProjectLayers /> // hier wir die neue Komponente importiert     
    </>

```

#### Darstellung der Daten
Um die Darstellung der Daten auf der Karte zu verbessern, können wir der Komponente MLGeoJsonLayer verschiedene Eigenschaften geben, die Farben, Größen und andere Aspekte der grafischen Darstellung der Daten definieren. 
Zurück zu unserer ProjectLayers-Komponente fügen wir diese Eigenschaften zu unserem MLGeoJsonLayer hinzu:

```
<MlGeoJsonLayer
        geojson={monitoringAreas}
        options={{
          paint: {
            "fill-color": "#5353ec",
            "fill-opacity": 0.5,
            "fill-outline-color": "#000",
          },
        }}
      />
```
Innerhalb der Optionen sind *paint* und *layout* für die Definition der grafischen Aspekte der Datendarstellung zuständig. 
Weitere Informationen hierzu sind in der MapLibre-Dokumentation zu finden:
***paint***: https://maplibre.org/maplibre-style-spec/layers/#paint-property
***layout***: https://maplibre.org/maplibre-style-spec/layers/#layout-property



#### <div align="right"> [Zu Step2](https://github.com/mapcomponents/webinar-2024/tree/main/Step2#step-2)</div>