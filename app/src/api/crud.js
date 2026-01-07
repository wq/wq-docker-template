import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

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

export function getCsrfToken() {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1];
}

export function useSubmitForm() {
    const { mutateAsync } = useMutation({
        async mutationFn({ action, method, data, hasFiles }) {
            const csrftoken = getCsrfToken();
            let body, headers;
            if (hasFiles) {
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
            const response = await fetch(`/${action}.json`, {
                method,
                headers,
                body,
            });
            if (!response.ok) {
                throw await responseToError(response);
            }
            return response.json();
        },
        onSuccess(result, { action, submitOptions: { postSaveNav } = {} }) {
            const [list] = action.split("/"),
                id = result?.id?.toString();
            queryClient.invalidateQueries({ queryKey: [list] });
            if (id) {
                queryClient.setQueryData([list, id], result);
            }
            if (postSaveNav) {
                postSaveNav(result);
            }
        },
    });
    return mutateAsync;
}

export async function responseToError(
    response,
    defaultMessage = "Error submitting form."
) {
    const error = new Error(defaultMessage);
    try {
        const errors = await response.json();
        if (errors.errors) {
            // allauth error format
            error.detail = {};
            for (const { param, message } of errors.errors) {
                error.detail[param] = [message];
            }
        } else {
            // wq (DRF) error format
            error.detail = errors;
        }
    } catch {
        error.detail = `${response.status} ${response.statusText}`;
    }
    return error;
}

export function useModel(modelName) {
    const { data } = useQuery({ queryKey: [modelName] });
    return data?.list || [];
}
