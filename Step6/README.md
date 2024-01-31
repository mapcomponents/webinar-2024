# MapComponents Webseminar 2024
#### <div align="right"> [Home](https://github.com/mapcomponents/webinar-2024)</div>

## Step 6

#### ToogleButton für einen Layer

Damit unsere Rettungspunkte-Ebene nicht immer sichtbar ist, werden wir eine Schaltfläche erstellen, mit der wir sie je nach Bedarf ein- oder ausschalten können. 
Zunächst definieren wir eine Variable mithilfe des useState-Hooks von React: 
```
  const [showRettungspunkte, setShowRettungspunkte] = useState(false);
```
useState ermöglicht es uns, die Variable und gleichzeitig die Funktion, die sie verändert, zu definieren. Dies ist wichtig, da unsere Anwendung auf jede Änderung des Zustands der Variablen showRettungspunkte reagieren soll.


Zuerst importieren wir es aus MaterialUI
```
import { Button } from "@mui/material";
```
und dann fügen wir den Button in unsere Retrun-Anweisung ein: 

```
 <Button
        variant="contained"
        onClick={() => setShowRettungspunkte(!showRettungspunkte)}
        sx={{ left: "90%", backgroundColor: showRettungspunkte ? "grey" : "green" }}
      >
        Rettungspunkte
      </Button>
```
Wenn der Button angeklickt wird, setzt er die Variable showRettungsPunkte auf den gegenteiligen Wert von den, der die hattet (wenn sie false war, wird sie true und umgekehrt). 
In den Style-Eigenschaften legen wir eine Expression als die Hintergrundfarbe des Buttons fest. Da mit wird die Farbe des Buttons, je nachdem, ob der Layer aktiv ist oder nicht, anders definiert. Auf diese Weise wird jedes Mal, wenn sich der Zustand von "showRettungspunkte" ändert, die Farbe der Schaltfläche aktualisiert. 

#### Bedingtes Rendering eines Layers
Mit den hinzugefügten Elementen können wir nun unserer Datenebene mitteilen, wann sie erscheinen soll und wann nicht. 
Dazu fügen wir den Ausdruck "{showRettungspunkte && [layer] }" um den MlGeoJsonLayer herum ein:

```
{showRettungspunkte && 
        <MlGeoJsonLayer
          layerId={"osm-rettung"}
          ... //weitere Code     
        />
}
```
Der Ausdruck ist das Jsx-Equivalent zu einem if-Ausdruck. Es ist, als würde man sagen: 

```
if(showRettungspunkte === true){
  return <MlGeoJsonLayer 
  ...
  />
}
```
#### OnClick funktion 
Zum Schluss fügen wir dem Layer eine Funktion für das Anklicken eines der Rettungspunkte hinzu. Innerhalb der MlGeojsonLayer-Komponente fügen wir die folgende Property hinzu: 

```
 onClick={(event) =>
            alert(
              "Id: " +
                JSON.stringify(event.features[0].properties["id"]) +
                "\nOperator: " +
                JSON.stringify(event.features[0].properties["operator"])
            )
          }
```

Diese Funktion ist sehr rudimentär und gibt durch den Alarm Interface eine Meldung mit den Daten des angeklickten Rettungspunktes aus. 
Unter den Event-Features kann man auf die Features zugreifen, deren Position mit der angeklickten Position übereinstimmt. Bei bestimmten Zoomstufen oder bei sich überschneidenden Geometrien kann es sich um mehr als ein Feature handeln. Aus diesem Grund rufen wir das erste Objekt in der Liste auf (features[0]) und fragen dann einige seiner Properties ab. 


#### <div align="right"> [Home](https://github.com/mapcomponents/webinar-2024)</div>
