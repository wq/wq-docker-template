import { QueryClient, useQuery } from "@tanstack/react-query";
import { parseISO } from "date-fns";

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
