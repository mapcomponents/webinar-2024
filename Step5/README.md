# MapComponents Webseminar 2024

## Step 5

Hier werden wir ein Image als Icon in den Project Laden und es für die Kennzeichnung unsere Rettungspunkte verwenden.

#### UseAdd Image Hook
Seit Version v0.1.86 bietet MapComponents die Möglichkeit, ein Bild in der MapLibre Instanz mit dem Hook useAddImage zu registrieren. Dies bedeutet, dass die Instanz das Bild registriert, sowie eine ID, die es identifiziert, und von da an kann das Bild referenziert werden, indem man einfach die angegebene ID verwendet. 

Zuerst laden wir das Bild, das wir verwenden wollen, herunter und kopieren es in das Verzeichnis "public".
https://www.waldverein-regensburg.de/images/pictures/wanderwege/rettungspunkt.jpg?w=600&h=600

Dann importieren wir useAddImage aus Map components: 

```
import { useAddImage } from "@mapcomponents/react-maplibre"; 
```

und registrieren wir das Bild mit Hilfe des Hooks: 

```
  useAddImage({
    imageId: "rettungs-punkt",
    imagePath: "/rettungspunkt.jpg"
  })

```

#### Das Symbol der Ebene zuweisen
Jetzt können wir unsere OSM-Datenebene so ändern, dass das registriertes Bild als Symbol anstelle eines Kreises verwendet wird. 

```
 <MlGeoJsonLayer
          layerId={"osm-rettung"}
          type="symbol"
          options={{
            type: "symbol",
            source: {
              type: "geojson",
              data: "osm://sources/schauinsland.osm" + optionsURL,
            },
            paint: { "icon-opacity": 0.8 },
            layout: {
              "icon-image": "rettungs-punkt",
              "icon-size": 0.07,
              "icon-anchor": "bottom",             
              "icon-allow-overlap": true,
            },
          }}
          labelProp="ref"          
        />
```

Die folgenden Änderungen sind hier wichtig: 
- der Ebenentyp wurde von "Circle" auf "Symbol" geändert
- Im Optionsobjekt verwenden wir die Eigenschaften "icon - XXX" verwendet, um der Ikone Eingeschafften zu steuern. 
- Im Layout haben wir die Eigenschaft "icon-image" hinzugefügt und der Wert ist die ID, die wir dem Bild gegeben haben, als wir es mit dem useAddImage Hook registriert haben.
- Die Eigenschaft "icon-size" reduziert die Größe des Bildes, die in diesem Fall 600x600 Pixel beträgt. In der Praxis wäre es sinnvoll, die ursprüngliche Größe des Bildes zu reduzieren, bevor es registriert wird. 



