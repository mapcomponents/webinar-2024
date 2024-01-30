import {
  MlGeoJsonLayer,
  useAddProtocol,
  OSMProtocolHandler,
  useAddImage,
} from "@mapcomponents/react-maplibre";

const osmOptions = {
  completeFeature: true,
  allFeatures: false,
  renderTagged: false,
  excludeWay: true,
  suppressWay: false,
};
const optionsURL = "?" + new URLSearchParams(JSON.stringify(osmOptions));

export default function OSMLayer() {
  useAddProtocol({
    protocol: "osm",
    handler: OSMProtocolHandler,
  });

  useAddImage({
    imageId: "rettungs-punkt",
    imagePath: "/rettungspunkt.jpg",
  });

  return (
    <>
      <MlGeoJsonLayer
        layerId={"osm-rettung"}
        type="symbol"
        options={{
          source: {
            type: "geojson",
            data: "osm://sources/schauinsland.osm" + optionsURL,
          },
          paint: { "icon-opacity": 0.8 },
          layout: {
            "icon-image": "rettungs-punkt",
            "icon-size": 0.07,
            "icon-anchor": "bottom",
            "icon-allow-overlap": true,
          },
        }}
        labelProp="ref"       
      />
    </>
  );
}
