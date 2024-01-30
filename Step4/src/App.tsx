import "./App.css";
import { MapLibreMap } from "@mapcomponents/react-maplibre";
import OSMLayer from "./Layers/OSMLayer";
import ProjectLayers from "./Layers/ProjectLayers";



function App() {
  return (
    <>
      <MapLibreMap
        options={{
          style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
          zoom: 12,
          center:[ 7.890701768202916, 47.91767470935818]
        }}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />
  
     <ProjectLayers />
     <OSMLayer />
    </>
  );
}

export default App; 