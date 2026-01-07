import { parseISO } from "date-fns";

export function formatDate(date) {
    if (!date) {
        return "";
    }
    return parseISO(date)?.toLocaleDateString();
}
