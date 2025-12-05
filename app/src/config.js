// Site Theme
export const siteTitle = "Example Project",
    logo = "/static/app/images/icon-192.png",
    theme = {
        primary: "#7500ae",
        secondary: "#0088bd",
    };

// Initial map bounds
export const initBounds = [
    [-180, -70],
    [180, 70],
];

// Base style JSON for MapLibre
export const basemaps = [
    {
        name: "Globe",
        type: "vector-tile",
        url: "https://demotiles.maplibre.org/globe.json",
    },
    {
        name: "Web Mercator",
        type: "vector-tile",
        url: "https://demotiles.maplibre.org/style.json",
    },
];

// wq.db tile service
export const tiles = "/tiles/{z}/{x}/{y}.pbf";
