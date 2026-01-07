import { ScrollView, List, ListItem, ListItemLink, Fab } from "@wq/material";
import { useQuery } from "@tanstack/react-query";
import PendingList from "../components/PendingList.jsx";
import { formatDate, useAuth } from "../api";

export default function ObservationList() {
    const { data, error, isPending, isError } = useQuery({
            queryKey: ["observations"],
        }),
        observations = data?.list || [],
        { user } = useAuth(),
        canAdd = Boolean(user);
    return (
        <>
            <ScrollView>
                <List>
                    {isPending && <PendingList />}
                    {isError && (
                        <ListItem>
                            Error loading observations: {error.message}
                        </ListItem>
                    )}
                    {data && observations.length === 0 && (
                        <ListItem>No observations found</ListItem>
                    )}
                    {observations.map((observation) => (
                        <ListItemLink
                            key={observation.id}
                            to={`/observations/${observation.id}`}
                            icon="observation"
                            description={observation.notes}
                        >
                            {formatDate(observation.date)}
                        </ListItemLink>
                    ))}
                </List>
            </ScrollView>
            {canAdd && <Fab to="/observations/new" icon="add" />}
        </>
    );
}
