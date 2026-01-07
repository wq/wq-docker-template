import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    ButtonLink,
    Link,
} from "@wq/material";
import { formatDate } from "../api";
import { useQuery } from "@tanstack/react-query";

export default function ObservationPopup({ feature }) {
    const { data: categories } = useQuery({ queryKey: ["categories"] }),
        category = categories?.list?.find(
            (c) => c.id === feature.properties.category_id
        );
    return (
        <Table size="small">
            <TableBody>
                <TableRow>
                    {feature.properties.photo && (
                        <TableCell colspan={2} align="center">
                            <Link to={`/observations/${feature.id}`}>
                                <img
                                    src={`/media/${feature.properties.photo}`}
                                    alt="Observation"
                                    style={{ height: 120 }}
                                />
                            </Link>
                        </TableCell>
                    )}
                </TableRow>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>{formatDate(feature.properties.date)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>
                        {category?.name || feature.properties.category_id}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colspan={2} align="center">
                        <ButtonLink
                            icon="observation"
                            variant="outlined"
                            to={`/observations/${feature.id}`}
                        >
                            View Observation
                        </ButtonLink>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
