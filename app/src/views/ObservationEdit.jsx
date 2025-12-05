import { useEffect } from "react";
import { ScrollView, List, ListItem } from "@wq/material";
import { Skeleton } from "@mui/material";
import { useParams } from "react-router";
import { useCurrentPageTitle } from "../components/Breadcrumbs.jsx";
import { useDetailQuery, formatDate } from "../api.js";

export default function ObservationEdit() {
    const { id } = useParams(),
        { data, error, isPending, isError } = useDetailQuery({
            queryKey: ["observations", id],
        }),
        [, setCurrentPageTitle] = useCurrentPageTitle();

    useEffect(() => {
        if (data) {
            setCurrentPageTitle(formatDate(data.date));
        }
    }, [data, setCurrentPageTitle]);

    return (
        <ScrollView>
            <List>
                <ListItem>FIXME</ListItem>
                {isPending && <Skeleton variant="rectangular" height={80} />}
                {isError && (
                    <ListItem>
                        Error loading observations {error.message}
                    </ListItem>
                )}
                {!isError && !isPending && !data && (
                    <ListItem>Not found</ListItem>
                )}
                {data && (
                    <ListItem>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </ListItem>
                )}
            </List>
        </ScrollView>
    );
}
