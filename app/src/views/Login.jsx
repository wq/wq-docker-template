import {
    AutoForm,
    Form,
    FormError,
    Input,
    CancelButton,
    SubmitButton,
} from "@wq/form";
import { ScrollView, HorizontalView } from "@wq/material";
import { useNavigate } from "react-router";
import { useLogin } from "../api";

export default function Login() {
    const login = useLogin(),
        navigate = useNavigate(),
        postSaveNav = () => {
            navigate("/");
        };
    return (
        <ScrollView>
            <AutoForm>
                <Form
                    onSubmit={login}
                    submitOptions={{ postSaveNav }}
                    data={{ username: "", password: "" }}
                >
                    <Input name="username" label="Username" />
                    <Input name="password" label="Password" type="password" />
                    <FormError />
                    <HorizontalView>
                        <CancelButton to="/">Cancel</CancelButton>
                        <SubmitButton>Log In</SubmitButton>
                    </HorizontalView>
                </Form>
            </AutoForm>
        </ScrollView>
    );
}
