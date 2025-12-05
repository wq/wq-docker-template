import {
    Root,
    Container,
    Header,
    Main,
    Footer,
    NavMenuFixed,
} from "@wq/material";
import { Outlet, Link } from "react-router";
import NavMenu from "./NavMenu.jsx";
import BreadcrumbRoot, { useBreadcrumbs } from "./Breadcrumbs.jsx";

const components = {
    NavLink: Link,
    NavMenu,
    useBreadcrumbs,
    useNav() {
        return () => null; // FIXME
    },
    useReverse() {
        return () => null; // FIXME
    },
};

export default function Layout({ config, icons, theme }) {
    return (
        <Root wq={{ config, components, icons }} theme={theme}>
            <BreadcrumbRoot>
                <Container>
                    <Header />
                    <Main>
                        <NavMenuFixed />
                        <Outlet />
                    </Main>
                    <Footer />
                </Container>
            </BreadcrumbRoot>
        </Root>
    );
}
