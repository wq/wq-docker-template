import { useState } from "react";
import { View, Popup, Img } from "@wq/material";

export default function ImagePreview({
    src,
    label = src?.split("/").reverse()[0],
}) {
    const [open, setOpen] = useState(false);
    if (!src) {
        return null;
    }
    return (
        <>
            <Img
                src={src}
                alt={label}
                style={{ maxHeight: 200, maxWidth: "66vw", cursor: "pointer" }}
                onClick={() => setOpen(true)}
            />
            <Popup open={open} onClose={() => setOpen(false)}>
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 8,
                    }}
                >
                    <Img
                        src={src}
                        alt={label}
                        onClick={() => setOpen(false)}
                        style={{
                            maxWidth: "95vw",
                            maxHeight: "90vh",
                        }}
                    />
                </View>
            </Popup>
        </>
    );
}
