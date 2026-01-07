// Root
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, AuthProvider } from "./api";

// Routes
import Home from "./views/Home";
import ObservationList from "./views/ObservationList.jsx";
import ObservationDetail from "./views/ObservationDetail.jsx";
import ObservationEdit from "./views/ObservationEdit.jsx";
import Categories from "./views/Categories.jsx";
import Login from "./views/Login.jsx";
import Logout from "./views/Logout.jsx";

// Theme
import Layout from "./components/Layout.jsx";
import { siteTitle, logo, theme } from "./config.js";
import {
    Place as Location,
    Assignment as Observation,
    Label as Category,
} from "@mui/icons-material";
import "maplibre-gl/dist/maplibre-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

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
                    {
                        path: "new",
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
            {
                path: "/login",
                navmenu: {
                    divider: true,
                    title: "Log In",
                    icon: "login",
                    showIf: (auth) => !auth.user,
                },
                Component: Login,
            },
            {
                path: "/logout",
                navmenu: {
                    divider: true,
                    title: "Log Out",
                    icon: "logout",
                    showIf: (auth) => auth.user,
                },
                Component: Logout,
            },
        ],
    },
];

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={createBrowserRouter(routes)} />
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>
);

if (window.location.hostname !== "localhost") {
    navigator.serviceWorker.register("/service-worker.js");
}
