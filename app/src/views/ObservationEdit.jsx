import { useEffect } from "react";
import { ScrollView } from "@wq/material";
import { AutoForm, DeleteForm } from "@wq/form";
import { MapProvider } from "@wq/map-gl";
import { Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useCurrentPageTitle } from "../components/Breadcrumbs.jsx";
import { useDetailQuery, formatDate, useSubmitForm, useModel } from "../api";

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
    components = { useModel };

export default function ObservationEdit() {
    const { id } = useParams(),
        { data, error, isPending, isError } = useDetailQuery({
            queryKey: ["observations", id],
            enabled: Boolean(id),
        }),
        [, setCurrentPageTitle] = useCurrentPageTitle(),
        navigate = useNavigate(),
        postSaveNav = (result) => {
            const observationId = result?.id || id || "";
            navigate(`/observations/${observationId}`);
        },
        postDeleteNav = () => {
            navigate("/observations/");
        },
        submitForm = useSubmitForm();

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
            {id && (
                <DeleteForm
                    action={`observations/${id}`}
                    onSubmit={submitForm}
                    submitOptions={{ postSaveNav: postDeleteNav }}
                />
            )}
            <MapProvider>
                <AutoForm
                    form={form}
                    wq={{ components }}
                    action={id ? `observations/${id}` : "observations"}
                    method={id ? "PUT" : "POST"}
                    onSubmit={submitForm}
                    submitOptions={{ postSaveNav }}
                    disabled={isPending || isError}
                    data={data}
                    cancel={`/observations/${id || ""}`}
                />
            </MapProvider>
        </ScrollView>
    );
}
