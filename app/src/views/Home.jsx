import { MapProvider, AutoMap } from "@wq/map-gl";
import { initBounds, basemaps, tiles } from "../config.js";
import ObservationPopup from "../views/ObservationPopup.jsx";

const overlays = [
        {
            name: "Observations",
            type: "vector-tile",
            layer: "observation",
            color: "#3388ff",
            active: true,
            legend: {
                Observation:
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='10' cy='10' r='6' fill='%233388ff'/%3E%3Ccircle cx='10' cy='10' r='3' fill='%23ffffff'/%3E%3C/svg%3E",
            },
            popup: "observation-popup",
        },
    ],
    components = {
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
