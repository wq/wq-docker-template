import React from "react";
import { Fieldset, Button, HorizontalView } from "@wq/material";

export default function CompactArray({ name, label, addRow, children }) {
    name = name.split(".").slice(-1)[0].replace(/s$/, "");
    return (
        <Fieldset label={label}>
            {children}
            <Button icon="add" onClick={() => addRow()}>
                Add {name}
            </Button>
        </Fieldset>
    );
}

CompactArray.Fieldset = HorizontalView;
