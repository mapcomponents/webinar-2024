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
In der Sidebar importieren wir die Komponente LayrList und fügen ihr mit der Komponente LayerListItem eine erste Ebene Jedem Element in der Layerlist kann ein *Name* zugewiesen werden, mit dem die Ebene in der Ebenenbaum identifiziert wird. 
*LayerComponent* ist ein wesentliches Attribut, denn in diesem wird die Ebene selbst übergeben. In diesem Fall ist unser erstes Element "Monitoring Areas", also nehmen wir die Ebene mit diesen Daten und verschieben sie in die Klammern: 

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
MapComponents LayerList bietet eine Vielzahl von Optionen, die für jedes Item in der Liste konfigurierbar sind. Hier sind einige von ihnen: 

- layerId: optionale String, der die ID definiert, mit der die Ebene auf der Karte registriert wird (wichtig für die Interaktion mit der Ebene in der Anwendung)
- name: Name, mit dem die Ebene in der Ebenenbaum identifiziert wird
- visible: bestimmt, ob die Ebene sichtbar ist oder nicht
- configurable: optionale Eigenschaft, die eine Schnittstelle zur Änderung von Layereigenschaften wie Farbe oder Liniendicke einführt (je nach Layertyp variabel)
- type: optionale Eigenschaft, die die Ebene verschiedenen Gruppen zuordnet. Optionen: 'background' | 'background-labels' | 'layer' | 'wms-layer' | 'vector-tile-layer';	
- description: optionale Eigenschaft;
- showDeleteButton: optionale Eigenschaft, mit der ein Button zum Löschen der Ebene aus der Liste eingeführt wird;
- buttons: Hier können benutzerdefinierte Buttons mit eigenen Funktionen hinzugefügt werden. 
- sortable: optionaler Boolescher Wert, der die Neuordnung von Listenelementen durch drag-and-drop ermöglicht;


Hier werden wir einige dieser Eigenschaften zu unsererLayerList hinzufügen:

```
<Sidebar open={true} name={"Layers"} >
        <LayerList>
          <LayerListItem                   
            configurable={true}
            type="layer"
            layerId="monitoring"
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