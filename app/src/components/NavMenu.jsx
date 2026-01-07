import { Fragment, useMemo } from "react";
import { routes } from "../main.jsx";
import { ScrollView, List, ListItemLink, Divider } from "@wq/material";
import { useLocation } from "react-router";
import { useAuth } from "../api";

export default function NavMenu() {
    const navRoutes = useNavMenu();
    return (
        <ScrollView>
            <List>
                {navRoutes.map((route) => (
                    <Fragment key={route.path}>
                        {route.navmenu.divider && <Divider />}
                        <ListItemLink
                            key={route.path}
                            to={route.path}
                            icon={route.navmenu.icon}
                            selected={route.selected}
                        >
                            {route.navmenu.title}
                        </ListItemLink>
                    </Fragment>
                ))}
            </List>
        </ScrollView>
    );
}

export function useNavMenu() {
    const { pathname } = useLocation(),
        auth = useAuth(),
        navRoutes = useMemo(() => {
            const navRoutes = [];
            function addRoute(route, prefix) {
                if (
                    route.navmenu &&
                    (!route.navmenu.showIf || route.navmenu.showIf(auth))
                ) {
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
        }, [auth]);
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
