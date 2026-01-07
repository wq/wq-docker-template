import { createContext, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, responseToError, getCsrfToken } from "./crud.js";

const authBaseUrl = "/_allauth/browser/v1/auth",
    AuthContext = createContext({});

export function AuthProvider({ children }) {
    const { data: authData } = useQuery({
            queryKey: ["auth"],
            async queryFn() {
                const response = await fetch(`${authBaseUrl}/session`);
                return response.json();
            },
        }),
        auth = authData?.meta?.is_authenticated
            ? { user: authData?.data?.user }
            : {};
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useLogin() {
    const { mutateAsync } = useMutation({
        mutationKey: ["login"],
        async mutationFn({ data: { username, password } }) {
            const response = await fetch(`${authBaseUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCsrfToken(),
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                throw await responseToError(response, "Login failed");
            }
            return response.json();
        },
        onSuccess(result, { submitOptions: { postSaveNav } }) {
            queryClient.setQueryData(["auth"], result);
            if (postSaveNav) {
                postSaveNav(result);
            }
        },
    });
    return mutateAsync;
}

export function useLogout() {
    const {
        mutate: logout,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationKey: ["logout"],
        async mutationFn() {
            const response = await fetch(`${authBaseUrl}/session`, {
                method: "DELETE",
                headers: {
                    "X-CSRFToken": getCsrfToken(),
                },
            });
            if (response.status !== 401) {
                throw await responseToError(response, "Logout failed");
            }
            return response.json();
        },
        onSuccess(result) {
            queryClient.setQueryData(["auth"], result);
        },
    });
    return { logout, isPending, isError, error };
}
