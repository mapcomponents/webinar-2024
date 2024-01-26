import {
  LayerList,
  LayerListItem,
  MlGeoJsonLayer,
  Sidebar,
  useAddProtocol,
  CSVProtocolHandler,
} from "@mapcomponents/react-maplibre";
import monitoringAreas from "./utils/monitoringAreas.json";

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
                  source: {
                    type: "geojson",
                    data: "csv://sources/samples.csv",
                  },
                  //paint: {"circle-radius": 5}
                  paint: { "circle-stroke-width": 0 },
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
