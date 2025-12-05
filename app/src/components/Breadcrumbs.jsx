import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    useEffect,
} from "react";
import { useConfig } from "@wq/react";
import { useNavMenu } from "./NavMenu.jsx";
import { useLocation } from "react-router";

const BreadcrumbContext = createContext();

export default function BreadcrumbRoot({ children }) {
    const [titles, setTitles] = useState({}),
        { pathname } = useLocation(),
        currentPageTitle = titles[pathname],
        setCurrentPageTitle = useCallback(
            (title) => {
                setTitles((prevTitles) => ({
                    ...prevTitles,
                    [pathname]: title,
                }));
            },
            [setTitles, pathname]
        );
    return (
        <BreadcrumbContext.Provider
            value={{ currentPageTitle, setCurrentPageTitle }}
        >
            {children}
        </BreadcrumbContext.Provider>
    );
}

export function useBreadcrumbs() {
    const { pathname } = useLocation(),
        navMenu = useNavMenu(),
        navRoute = navMenu.find((route) => route.selected),
        [currentPageTitle] = useCurrentPageTitle(),
        config = useConfig();

    const breadcrumbs = useMemo(() => {
        const breadcrumbs = [];
        if (navRoute) {
            let path = "";
            for (const part of navRoute.path
                .split("/")
                .filter((p, i) => p || i === 0)) {
                path += path.endsWith("/") ? part : `/${part}`;
                const title = navMenu.find((r) => r.path === path)?.navmenu
                    ?.title;
                if (title) {
                    breadcrumbs.push({ url: path, label: title });
                }
            }
            if (pathname.length > navRoute.path.length) {
                if (pathname.endsWith("/edit")) {
                    breadcrumbs.push({
                        url: pathname.replace("/edit", ""),
                        label: currentPageTitle || "(Item)",
                    });
                    breadcrumbs.push({ url: pathname, label: "Edit" });
                } else {
                    breadcrumbs.push({
                        url: pathname,
                        label: currentPageTitle || "(Item)",
                    });
                }
            }
        } else if (currentPageTitle) {
            breadcrumbs.push({ url: "/", label: "Home" });
            breadcrumbs.push({ url: pathname, label: currentPageTitle });
        }
        return breadcrumbs;
    }, [navMenu, navRoute, pathname, currentPageTitle]);

    useEffect(() => {
        let lastTitle = breadcrumbs[breadcrumbs.length - 1]?.label;
        if (lastTitle === "Edit") {
            const detailTitle = breadcrumbs[breadcrumbs.length - 2]?.label;
            lastTitle = `Editing ${detailTitle}`;
        }
        document.title = lastTitle
            ? `${lastTitle} - ${config.site_title}`
            : config.site_title;
    }, [breadcrumbs, config.site_title]);

    return breadcrumbs;
}

export function useCurrentPageTitle() {
    const { currentPageTitle, setCurrentPageTitle } =
        useContext(BreadcrumbContext);
    return [currentPageTitle, setCurrentPageTitle];
}
