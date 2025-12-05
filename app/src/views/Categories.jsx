import { ScrollView, List, ListItem } from "@wq/material";
import { useQuery } from "@tanstack/react-query";
import PendingList from "../components/PendingList.jsx";

export default function Categories() {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["categories"],
    });
    const categories = data?.list || [];
    return (
        <ScrollView>
            <List>
                {isPending && <PendingList />}
                {isError && (
                    <ListItem>
                        Error loading categories: {error.message}
                    </ListItem>
                )}
                {categories.length === 0 && !isPending && (
                    <ListItem>No categories found.</ListItem>
                )}
                {categories.map((category) => (
                    <ListItem
                        key={category.id}
                        icon="category"
                        description={category.description}
                    >
                        {category.name}
                    </ListItem>
                ))}
            </List>
        </ScrollView>
    );
}
