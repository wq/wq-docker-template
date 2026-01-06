import { useState } from "react";
import { ScrollView, List, ListItem, IconButton, Popup } from "@wq/material";
import { AutoForm } from "@wq/form";
import { useQuery } from "@tanstack/react-query";
import PendingList from "../components/PendingList.jsx";
import { useSubmitForm } from "../api.js";
import { set } from "date-fns";

const form = [
        {
            name: "name",
            label: "Name",
            bind: {
                required: true,
            },
            "wq:length": 255,
            type: "string",
        },
        {
            name: "description",
            label: "Description",
            type: "text",
        },
    ],
    components = { useSubmitForm };

export default function Categories() {
    const { data, error, isPending, isError } = useQuery({
            queryKey: ["categories"],
        }),
        [editCategory, setEditCategory] = useState(null);
    const categories = data?.list || [];
    return (
        <ScrollView>
            {editCategory && (
                <Popup
                    title={`Edit Category: ${editCategory.name}`}
                    open={Boolean(editCategory)}
                    onClose={() => setEditCategory(null)}
                >
                    <AutoForm
                        wq={{ components }}
                        form={form}
                        data={editCategory}
                        action={
                            editCategory.id
                                ? `categories/${editCategory.id}`
                                : "categories"
                        }
                        method={editCategory.id ? "PUT" : "POST"}
                        postSaveNav={() => setEditCategory(null)}
                    />
                </Popup>
            )}
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
                        secondaryAction={
                            <IconButton
                                icon="edit"
                                onClick={() => setEditCategory(category)}
                            />
                        }
                    >
                        {category.name}
                    </ListItem>
                ))}
                <ListItem
                    button
                    icon="add"
                    onClick={() =>
                        setEditCategory({ name: "", description: "" })
                    }
                >
                    Add Category
                </ListItem>
            </List>
        </ScrollView>
    );
}
