# MapComponents Webseminar 2024

## Step 3

Um die Visualisierung unserer GIS-Daten zu verbessern und mit unseren Layern über die Benutzeroberfläche zu interagieren, bietet mapComponents seit der Version v0.1.68 die Komponente LayerList an. Diese Komponente ermöglicht die einfache Erstellung eines Ebenenbaums und bietet Funktionalitäten wie die Änderung der Sichtbarkeit von Ebenen, die Bearbeitung der Symbole durch dynamische Werkzeuge oder die Reorganisation des Baums durch Verschieben von Layern per Drag-and-Drop.
Als nächstes werden wir unsere Datenebenen in einen Ebenenbaum integrieren. 

#### Sidebar
Als Vorbereitung erstellen wir in unserer Komponente eine Oberfläche, auf der wir unseren Ebenenbaum anzeigen werden. MapComponents bietet eine anpassbare Seidebar, die für diesen Zweck ideal ist. 
Wir fügen "Sidebar" in die Liste der Mapcomponent-Importe am Beginn der Datei ein und nach unserer Return Stament fügen wir die Komponente hinzu:  

```
 <Sidebar open={true} name={"Layers"} >
 </Sidebar>

```

#### LayerList und LayerListItem
In der Sidebar importieren wir die Komponente LayerList und fügen ihr mit der Komponente LayerListItem eine erste Ebene hinzu. Beide Komponenten werden in die MapComponents-Importliste noch hinzugefügt. 

```
 <Sidebar open={true} name={"Layers"} >
    <LayerList>
      <LayerListItem       
        name="Monitoring areas"            
        layerComponent={} 
        />
         
    </LayerList>
</Sidebar>
```
In der Sidebar importieren wir die Komponente LayrList und fügen ihr mit der Komponente LayerListItem eine erste Ebene Jedem Element in der Layerlist kann ein Name zugewiesen werden, mit dem die Ebene in der Ebenenbaum identifiziert wird. 
*LayerComponent* ist ein wesentliches Attribut, denn in diesem  wird die Ebene selbst übergeben. In diesem Fall ist unser erstes Element "Monitoring Areas", also nehmen wir die Ebene mit diesen Daten und verschieben sie in die Klammern: 

```
 <Sidebar open={true} name={"Layers"} >
        <LayerList>
          <LayerListItem 
            type="layer"
            name="Monitoring areas"            
            layerComponent={
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
            }
        />
</Sidebar>
```
#### LayeListItem Properties

