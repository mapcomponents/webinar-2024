import { useState } from "react";
import {
  MlGeoJsonLayer,
  useAddProtocol,
  OSMProtocolHandler,
  useAddImage
} from "@mapcomponents/react-maplibre";

import { Button } from "@mui/material";

const osmOptions = {
  completeFeature: true,
  allFeatures: false,
  renderTagged: false,
  excludeWay: true,
  suppressWay: false,
};
const optionsURL = "?" + new URLSearchParams(JSON.stringify(osmOptions));

export default function OSMLayer() {

  const [showRettungspunkte, setShowRettungspunkte] = useState(false);
  const buttonColor = showRettungspunkte ? "grey" : "green";

  useAddProtocol({
    protocol: "osm",
    handler: OSMProtocolHandler,
  });

  useAddImage({
    imageId: "rettungs-punkt",
    imagePath: "/rettungspunkt.jpg"
  })

  return (
    <>
      {showRettungspunkte && 
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
          onClick={(event) =>
            alert(
              "Id: " +
                JSON.stringify(event.features[0].properties["id"]) +
                "\nOperator: " +
                JSON.stringify(event.features[0].properties["operator"])
            )
          }
        />
      }

      <Button
        variant="contained"
        onClick={() => setShowRettungspunkte(!showRettungspunkte)}
        sx={{ left: "90%", backgroundColor: buttonColor }}
      >
        Rettungspunkte
      </Button>
    </>
  );
}
