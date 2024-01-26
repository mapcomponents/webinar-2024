import { useEffect, useState } from "react";
import {
  MlGeoJsonLayer,
  useAddProtocol,
  useMap,
  OSMProtocolHandler,
} from "@mapcomponents/react-maplibre";

import { Button } from "@mui/material";

/*
TODO; 
 - import protocol Handler von MapComponents
 - useAdd image importieren / add image hook entfernen
 -source und label properties den MlGeojsonLayer nehmen (und addSource hook entfernen) 
*/
const osmOptions = {
  completeFeature: true,
  allFeatures: false,
  renderTagged: false,
  excludeWay: true,
  suppressWay: false,
};
const optionsURL = "?" + new URLSearchParams(JSON.stringify(osmOptions));

export default function OSMLayer() {
  const mapHook = useMap({ mapId: undefined });

  const [showRettungspunkte, setShowRettungspunkte] = useState(false);
  const buttonColor = showRettungspunkte ? "grey" : "green";

  useAddProtocol({
    protocol: "osm",
    handler: OSMProtocolHandler,
  });

  useEffect(() => {
    if (!mapHook.map?.hasImage("rettungs-punkt")) {
      mapHook.map?.loadImage("/rettungspunkt.jpg", (error, image) => {
        if (error) throw error;
        mapHook.map?.addImage("rettungs-punkt", image);
      });
    }
  }, [mapHook.map]);

  return (
    <>
      {showRettungspunkte && (
        <MlGeoJsonLayer
          layerId={"osm-rettung"}
          type="symbol"
          options={{
            type: "symbol",
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
          onClick={(ev) =>
            alert(
              "Id: " +
                JSON.stringify(ev.features[0].properties["id"]) +
                "\nOperator: " +
                JSON.stringify(ev.features[0].properties["operator"])
            )
          }
        />
      )}

      <Button
        variant="contained"
        onClick={() => setShowRettungspunkte(!showRettungspunkte)}
        sx={{ zIndex: 1200, left: "90%", backgroundColor: buttonColor }}
      >
        Rettungspunkte
      </Button>
    </>
  );
}
