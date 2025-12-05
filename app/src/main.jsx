// Root
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api.js";

// Routes
import Home from "./views/Home";
import ObservationList from "./views/ObservationList.jsx";
import ObservationDetail from "./views/ObservationDetail.jsx";
import ObservationEdit from "./views/ObservationEdit.jsx";
import Categories from "./views/Categories.jsx";

// Theme
import Layout from "./components/Layout.jsx";
import { siteTitle, logo, theme } from "./config.js";
import {
    Place as Location,
    Assignment as Observation,
    Label as Category,
} from "@mui/icons-material";
import "maplibre-gl/dist/maplibre-gl.css";

const config = {
    site_title: siteTitle,
    logo: logo,
};

const icons = { Location, Observation, Category };

export const routes = [
    {
        Component() {
            return <Layout config={config} theme={theme} icons={icons} />;
        },
        children: [
            {
                index: true,
                navmenu: {
                    title: "Map",
                    icon: "map",
                },
                Component: Home,
            },
            {
                path: "/observations",
                navmenu: {
                    title: "Observations",
                    icon: "observation",
                },
                children: [
                    {
                        index: true,
                        Component: ObservationList,
                    },
                    {
                        path: ":id",
                        Component: ObservationDetail,
                    },
                    {
                        path: ":id/edit",
                        Component: ObservationEdit,
                    },
                ],
            },
            {
                path: "/categories",
                navmenu: {
                    title: "Categories",
                    icon: "category",
                },
                Component: Categories,
            },
        ],
    },
];

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={createBrowserRouter(routes)} />
        </QueryClientProvider>
    </StrictMode>
);

if (window.location.hostname !== "localhost") {
    navigator.serviceWorker.register("/service-worker.js");
}
