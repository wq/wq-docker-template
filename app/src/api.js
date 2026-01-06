import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import { useCallback } from "react";
import { useNavigate } from "react-router";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            async queryFn({ queryKey }) {
                const response = await fetch(`/${queryKey.join("/")}.json`);
                if (!response.ok) {
                    throw new Error("Error loading data.");
                }
                return response.json();
            },
        },
    },
});

export function useDetailQuery(options) {
    return useQuery({
        ...options,
        placeholderData() {
            const [list, id] = options.queryKey;
            return queryClient
                .getQueryData([list])
                ?.list?.find((item) => item.id?.toString() === id);
        },
    });
}

export function formatDate(date) {
    if (!date) {
        return "";
    }
    return parseISO(date)?.toLocaleDateString();
}

function addFormData(formData, data, prefix = "") {
    for (const [key, value] of Object.entries(data)) {
        const formKey = prefix ? `${prefix}[${key}]` : key;
        if (value.name && value.type && value.body) {
            formData.append(formKey, value.body, value.name);
        } else if (value.type && value.coordinates) {
            formData.append(formKey, JSON.stringify(value));
        } else if (Array.isArray(value)) {
            value.forEach((val, index) => {
                addFormData(formData, val, `${formKey}[${index}]`);
            });
        } else if (value !== null && typeof value === "object") {
            addFormData(formData, value, formKey);
        } else if (value !== undefined && formKey !== "_method") {
            formData.append(formKey, value);
        }
    }
}

const mutationOptions = {
    async mutationFn({ url, method, data, has_files }) {
        const csrftoken =
            document.cookie
                .split("; ")
                .find((row) => row.startsWith("csrftoken="))
                ?.split("=")[1] || "";
        let body, headers;
        if (has_files) {
            body = new FormData();
            addFormData(body, data);
            if (method === "POST") {
                body.append("csrfmiddlewaretoken", csrftoken);
            } else {
                headers = {
                    "X-CSRFToken": csrftoken,
                };
            }
        } else {
            body = JSON.stringify(data);
            headers = {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            };
        }
        const response = await fetch(`/${url}.json`, {
            method,
            headers,
            body,
        });
        if (!response.ok) {
            const error = new Error("Error submitting form.");
            try {
                error.detail = await response.json();
            } catch {
                error.detail = {
                    detail: [`${response.status} ${response.statusText}`],
                };
            }
            throw error;
        }
        return response.json();
    },
    onSuccess(data, { url }) {
        const [list] = url.split("/"),
            id = data.id?.toString();
        queryClient.invalidateQueries({ queryKey: [list] });
        queryClient.setQueryData([list, id], data);
    },
};

export function useSubmitForm() {
    const { mutateAsync } = useMutation(mutationOptions);
    return useCallback(
        async ({ url, method, data, has_files, postSaveNav }) => {
            if (!method) {
                method = data._method || "POST";
            }
            try {
                const result = await mutateAsync({
                    url,
                    method,
                    data,
                    has_files,
                });
                if (postSaveNav) {
                    postSaveNav({ result });
                }
                return [{ result }, false];
            } catch (error) {
                const errorDetail =
                    error.detail || error.message || "Error: " + error;
                return [{ error: errorDetail }, true];
            }
        },
        [mutateAsync]
    );
}

export function useModel(modelName) {
    const { data } = useQuery({ queryKey: [modelName] });
    return data?.list || [];
}
