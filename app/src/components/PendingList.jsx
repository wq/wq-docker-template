import { ListItem } from "@wq/material";
import { Skeleton } from "@mui/material";

export default function PendingList() {
    return (
        <>
            <ListItem>
                <Skeleton />
            </ListItem>
            <ListItem>
                <Skeleton />
            </ListItem>
            <ListItem>
                <Skeleton />
            </ListItem>
        </>
    );
}
