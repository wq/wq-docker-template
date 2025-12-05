import { Fragment, Children } from "react";
import { TabGroup, Divider, useMinWidth } from "@wq/material";

export default function ResponsiveTabs({ children }) {
    const splitScreen = useMinWidth(900);

    if (splitScreen) {
        return (
            <>
                {Children.toArray(children).map((child, index) => (
                    <Fragment key={index}>
                        {index > 0 && <Divider orientation="vertical" />}
                        {child.props.children}
                    </Fragment>
                ))}
            </>
        );
    } else {
        return <TabGroup sx={{ minHeight: 72 }}>{children}</TabGroup>;
    }
}
