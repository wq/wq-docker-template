import { MapProvider, AutoMap } from "@wq/map-gl";
import { initBounds, basemaps, tiles } from "../config.js";
import LegendIcon from "../components/LegendIcon.jsx";
import ObservationPopup from "../views/ObservationPopup.jsx";

const overlays = [
        {
            name: "Observations",
            type: "vector-tile",
            layer: "observation",
            color: "#3388ff",
            active: true,
            legend: {
                Observation: "circle-#3388ff",
            },
            popup: "observation-popup",
        },
    ],
    components = {
        LegendIcon,
        ObservationPopup,
    };

export default function Home() {
    return (
        <MapProvider wq={{ components }}>
            <AutoMap
                basemaps={basemaps}
                initBounds={initBounds}
                tiles={tiles}
                overlays={overlays}
            />
        </MapProvider>
    );
}
