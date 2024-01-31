import {
  MlGeoJsonLayer,
} from "@mapcomponents/react-maplibre";
import monitoringAreas from "./monitoringAreas.json";

export default function ProjectLayers() {

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
     
    </>
  );
}
