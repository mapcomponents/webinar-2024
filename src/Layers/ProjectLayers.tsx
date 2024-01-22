import {
  LayerList,
  LayerListItem,
  MlGeoJsonLayer,
  Sidebar,
  useAddProtocol,
  CsvProtocolHandler,
} from "@mapcomponents/react-maplibre";
import monitoringAreas from "./utils/monitoringAreas.json";

export default function ProjectLayers() {
  useAddProtocol({
    protocol: "osm",
    handler: CsvProtocolHandler,
  });

  

  return (
    <>
      <Sidebar open={true} name={"Layers"}>
        <LayerList>
          <LayerListItem
            layerComponent={<MlGeoJsonLayer geojson={monitoringAreas as any} />}
            visible={true}
            configurable={true}
            type="layer"
            layerId="monitoring"
            name="Monitoring areas"      
          />

          <LayerListItem
            name={"Samples"}
            layerComponent={<MlGeoJsonLayer 
                layerId="samples"
                options={{
                  type: "circle",
                  source: {
                    type: "geojson",
                    data: "csv://sources/samples.csv",
                  },
                }}
              />
            }
            configurable={true}
          />
        </LayerList>
      </Sidebar>
    </>
  );
}
