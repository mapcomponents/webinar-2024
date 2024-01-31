import {
  MlGeoJsonLayer,
  useAddProtocol,
  OSMProtocolHandler,
} from "@mapcomponents/react-maplibre";

const osmOptions = {
  completeFeature: true,
  renderTagged: false,
  excludeWay: true
};
const optionsURL = "?" +  encodeURI(JSON.stringify(osmOptions));

export default function OSMLayer() {
  useAddProtocol({
    protocol: "osm",
    handler: OSMProtocolHandler,
  });

  return (
    <>
      <MlGeoJsonLayer
        layerId={"osm-rettung"}
        type="circle"
        options={{
          source: {
            type: "geojson",
            data: "osm://sources/schauinsland.osm" + optionsURL,
          },
          paint: { "circle-opacity": 0.8 },          
        }}
        labelProp="ref"
        
      />
    </>
  );
}
