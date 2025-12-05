import { useMemo } from "react";
import { routes } from "../main.jsx";
import { ScrollView, ListItemLink } from "@wq/material";
import { useLocation } from "react-router";

export default function NavMenu() {
    const navRoutes = useNavMenu();
    return (
        <ScrollView>
            {navRoutes.map((route) => (
                <ListItemLink
                    key={route.path}
                    to={route.path}
                    icon={route.navmenu.icon}
                    selected={route.selected}
                >
                    {route.navmenu.title}
                </ListItemLink>
            ))}
        </ScrollView>
    );
}

export function useNavMenu() {
    const { pathname } = useLocation(),
        navRoutes = useMemo(() => {
            const navRoutes = [];
            function addRoute(route, prefix) {
                if (route.navmenu) {
                    navRoutes.push({
                        ...route,
                        path: `${prefix}${route.path || ""}` || "/",
                    });
                }
                route.children?.forEach((child) =>
                    addRoute(
                        child,
                        route.path ? `${prefix}${route.path}/` : prefix || ""
                    )
                );
            }
            addRoute(routes[0], "");
            return navRoutes;
        }, []);
    return useMemo(() => {
        return navRoutes.map((route) => ({
            ...route,
            selected:
                route.path == pathname ||
                (pathname.startsWith(`${route.path}/`) &&
                    !navRoutes.some(
                        (r) =>
                            r.path.startsWith(`${route.path}/`) &&
                            r.path.length > route.path.length
                    )),
        }));
    }, [navRoutes, pathname]);
}
