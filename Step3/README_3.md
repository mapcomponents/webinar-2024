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