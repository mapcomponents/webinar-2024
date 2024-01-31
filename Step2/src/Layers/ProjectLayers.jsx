import {
  MlGeoJsonLayer,
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

      <MlGeoJsonLayer
        layerId="samples"
        type="circle"
        options={{
          source: {
            type: "geojson",
            data: "csv://sources/samples.csv",
          },
          paint: {
            "circle-color": "#22BB5D",
            "circle-stroke-width": 1,
          },
        }}
        labelProp="id"
        labelOptions={{
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
    </>
  );
}
