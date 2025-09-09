'use client'

import { Button, TextField } from "@/components"
import { Formik, Form } from "formik"

export const LoginForm: React.FC = () => {
    return <div className="">
        <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {

            }}
        >
            {({ isSubmitting }) => (
                <Form className="p-10 flex gap-5">
                    <TextField name="username" type="select" placeholder="digite o nome de usuário" theme="lined" />
                    <TextField name="username" type="select" placeholder="digite o nome de usuário" theme="filled" />
                    <Button name="botão" theme="beige"></Button>
                    <Button name="botão" theme="green"></Button>
                    <Button name="botão" theme="brown"></Button>
                    <Button name="botão" theme="red"></Button>
                </Form>
            )}
        </Formik>
    </div>
}