import { useEffect } from "react";
import { ScrollView } from "@wq/material";
import { AutoForm } from "@wq/form";
import { MapProvider } from "@wq/map-gl";
import { Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useCurrentPageTitle } from "../components/Breadcrumbs.jsx";
import { useDetailQuery, formatDate, useSubmitForm, useModel } from "../api.js";

const form = [
        {
            name: "date",
            label: "Date",
            hint: "The date when the observation was taken",
            type: "date",
        },
        {
            name: "category",
            label: "Category",
            hint: "Observation type",
            type: "select one",
            "wq:ForeignKey": "categories",
        },
        {
            name: "geometry",
            label: "Location",
            bind: {
                required: true,
            },
            hint: "The location of the observation",
            type: "geopoint",
        },
        {
            name: "photo",
            label: "Photo",
            hint: "Photo of the observation",
            type: "image",
        },
        {
            name: "notes",
            label: "Notes",
            hint: "Field observations and notes",
            type: "text",
            multiline: true,
        },
    ],
    components = { useSubmitForm, useModel };

export default function ObservationEdit() {
    const { id } = useParams(),
        { data, error, isPending, isError } = useDetailQuery({
            queryKey: ["observations", id],
            enabled: Boolean(id),
        }),
        [, setCurrentPageTitle] = useCurrentPageTitle(),
        navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setCurrentPageTitle(formatDate(data.date));
        }
    }, [data, setCurrentPageTitle]);

    return (
        <ScrollView>
            {id && isPending && (
                <Alert severity="warning">Loading observation...</Alert>
            )}
            {isError && <Alert severity="error">{error.message}</Alert>}
            <MapProvider>
                <AutoForm
                    wq={{ components }}
                    action={id ? `observations/${id}` : "observations"}
                    cancel={`/observations/${id || ""}`}
                    postSaveNav={({ result }) =>
                        navigate(`/observations/${result.id}`)
                    }
                    method={id ? "PUT" : "POST"}
                    disabled={isPending || isError}
                    data={data}
                    form={form}
                />
            </MapProvider>
        </ScrollView>
    );
}
