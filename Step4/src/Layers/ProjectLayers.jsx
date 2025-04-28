import {
  LayerList,
  LayerListItem,
  MlGeoJsonLayer,
  Sidebar,
  useAddProtocol,
  CSVProtocolHandler,
} from "@mapcomponents/react-maplibre";
import monitoringAreas from "./monitoringAreas.json";

export default function ProjectLayers() {
  useAddProtocol({
    protocol: "csv",
    handler: CSVProtocolHandler,
  });

  return (
    <>
      <Sidebar open={true} name={"Layers"}>
        <LayerList>
          <LayerListItem
            configurable={true}
            visible={true}
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
            visible={true}
            type="layer"
            layerComponent={
              <MlGeoJsonLayer
                layerId="samples"
                type="circle"
                options={{
                  source: {
                    type: "geojson",
                    data: "csv://sources/samples.csv",
                  },                  
                  paint: { "circle-color": "#22BB5D" , "circle-stroke-width": 0 },
                }}
                labelProp="id"
                labelOptions={{
                  layout: {
                    "text-size": {
                      "stops": [
                        [
                          13,
                          15
                        ],
                        [
                          22,
                          60
                        ]
                      ]
                    }
                },
                minzoom: 13
              }
              }
              />
            }
          />
        </LayerList>
      </Sidebar>
    </>
  );
}

/*
 */
