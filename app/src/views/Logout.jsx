import { useEffect } from "react";
import { ScrollView, ButtonLink, View, HorizontalView } from "@wq/material";
import { FormRoot } from "@wq/form";
import { Alert } from "@mui/material";
import { useLogout, useAuth } from "../api";

export default function Logout() {
    const { user } = useAuth(),
        { logout, isPending, isError, error } = useLogout();

    useEffect(() => {
        if (user) {
            logout();
        }
    }, [user, logout]);

    return (
        <ScrollView>
            <View
                sx={{
                    width: "100%",
                    maxWidth: "70em",
                    padding: "1em",
                    boxSizing: "border-box",
                }}
            >
                {user && !isPending && !isError && (
                    <Alert severity="warning">Logged in.</Alert>
                )}
                {isPending && <Alert severity="info">Logging out...</Alert>}
                {isError && (
                    <Alert severity="error">
                        Error logging out: {error.message}
                    </Alert>
                )}
                {!user && !isPending && !isError && (
                    <Alert severity="success">Logged out.</Alert>
                )}
                <HorizontalView>
                    <View />
                    <ButtonLink icon="map" to="/" variant="outlined">
                        Return to Map
                    </ButtonLink>
                </HorizontalView>
            </View>
        </ScrollView>
    );
}
