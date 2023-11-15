import React from "react";
import { AutoMap } from "@wq/map";
import { MapProvider, HighlightPopup } from "@wq/map-gl";

export default function Index() {
    return (
        <MapProvider>
            <AutoMap mapId="map" context={{}}>
                <HighlightPopup inMap />
            </AutoMap>
            <HighlightPopup />
        </MapProvider>
    );
}
