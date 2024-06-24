import { useState } from "react";
import {
  LayerList,
  LayerListItem,
  MlGeoJsonLayer,
  Sidebar,
  useAddProtocol,
  CSVProtocolHandler,
  AddLayerButton,
  useSource
} from "@mapcomponents/react-maplibre";
import monitoringAreas from "./monitoringAreas.json";
import {Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProjectLayers() {

  useAddProtocol({
    protocol: "csv",
    handler: CSVProtocolHandler,
  });

  useSource({sourceId: "samples-source" , source:{
    type: "geojson",
    data: "csv://sources/samples.csv",
  }})

  const [userLayer, setUserlayer] = useState();
 
  
  return (
    <>
      <Sidebar open={true} name={"Layers"}>
        
        <AddLayerButton
          layerTypes={["osm"]}
          onComplete={(config) => setUserlayer(config)}
        />
        
        <LayerList>
          <LayerListItem
            visible={true}
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
          <LayerListItem
            name="Samples"
            configurable={true}
            layerComponent={
              <MlGeoJsonLayer
                layerId="samples"
                type="circle"
                options={{
                  source: "samples-source",
                  paint: {
                    "circle-color": "#22BB5D",
                    "circle-stroke-width": 0,
                  },
                }}
                labelProp="id"
                labelOptions={{
                  source: "samples-source",  
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
            }
          />
          {userLayer &&  <LayerListItem
            name="User Layer"
            configurable={true}            
            buttons={<Button onClick={()=> setUserlayer(undefined)}><DeleteIcon /></Button>}
            layerComponent={<MlGeoJsonLayer {...userLayer?.config} />}            
            />
          }
        </LayerList>
      </Sidebar>
    </>
  );
}

/*
 */
