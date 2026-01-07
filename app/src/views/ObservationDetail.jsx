import { useEffect } from "react";
import {
    Typography,
    ScrollView,
    View,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Fab,
    TabItem,
} from "@wq/material";
import { MapProvider, AutoMap, Geojson } from "@wq/map-gl";
import { Skeleton, Alert } from "@mui/material";
import { useDetailQuery, useAuth, formatDate } from "../api";
import { useParams } from "react-router";
import { useCurrentPageTitle } from "../components/Breadcrumbs.jsx";
import ResponsiveTabs from "../components/ResponsiveTabs.jsx";
import ImagePreview from "../components/ImagePreview.jsx";
import { useQuery } from "@tanstack/react-query";
import { basemaps, initBounds } from "../config.js";

export default function ObservationDetail() {
    const { id } = useParams(),
        { user } = useAuth(),
        canEdit = Boolean(user),
        { data, error, isPending, isError } = useDetailQuery({
            queryKey: ["observations", id],
        }),
        { data: categoryData } = useQuery({ queryKey: ["categories"] }),
        [, setCurrentPageTitle] = useCurrentPageTitle();

    useEffect(() => {
        if (data) {
            setCurrentPageTitle(formatDate(data.date));
        }
    }, [data, setCurrentPageTitle]);

    return (
        <ResponsiveTabs>
            <TabItem label="Detail" value="detail" icon="detail">
                <ScrollView>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {isError && (
                            <Alert severity="error">
                                Error loading observation: {error.message}
                            </Alert>
                        )}
                        <Table sx={{ minWidth: 300, width: "80%" }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>
                                        {isPending ? (
                                            <Skeleton />
                                        ) : (
                                            formatDate(data?.date)
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Category</TableCell>
                                    <TableCell>
                                        {isPending || !categoryData ? (
                                            <Skeleton />
                                        ) : (
                                            categoryData?.list?.find(
                                                (cat) =>
                                                    cat.id === data?.category_id
                                            )?.name || data?.category_id
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Photo</TableCell>
                                    <TableCell>
                                        {isPending ? (
                                            <Skeleton
                                                variant="rectangular"
                                                width={267}
                                                height={200}
                                            />
                                        ) : data?.photo ? (
                                            <ImagePreview src={data.photo} />
                                        ) : (
                                            <Typography
                                                variant="caption"
                                                sx={{ my: 35 }}
                                            >
                                                No image available
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Notes</TableCell>
                                    <TableCell>
                                        {isPending ? (
                                            <Skeleton />
                                        ) : (
                                            <>{data?.notes}</>
                                        )}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </View>
                </ScrollView>
                {canEdit && <Fab icon="edit" to={`/observations/${id}/edit`} />}
            </TabItem>
            <TabItem label="Location" value="location" icon="location">
                {data?.geometry && (
                    <MapProvider>
                        <AutoMap
                            toolbar={false}
                            basemaps={basemaps}
                            initBounds={initBounds}
                            autoZoom={{
                                wait: 0.5,
                                maxZoom: 13,
                                animate: true,
                                sources: ["Observation"],
                            }}
                        >
                            <Geojson
                                active
                                name="Observation"
                                data={data.geometry}
                                color="#3388ff"
                            />
                        </AutoMap>
                    </MapProvider>
                )}
            </TabItem>
        </ResponsiveTabs>
    );
}
