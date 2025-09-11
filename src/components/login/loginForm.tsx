'use client'

import { Button, SelectField, Subtitle, TextField } from "@/components"
import { Formik, Form } from "formik"
import { useRouter } from "next/navigation"

export const LoginForm: React.FC = () => {

    const router = useRouter();

    return <div className="">
        <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
                alert("User: " + values.username + "e Password: " + values.password)

                router.push("/inicio");
            }} >
            {({ isSubmitting }) => (
                <Form className="py-10 px-10 md:px-40 lg:px-20 mx-auto justify-center
                 flex flex-col gap-5 bg-[#063D38] 
                 lg:w-[40rem] lg:h-screen lg:rounded-bl-3xl lg:rounded-tl-3xl">
                    <Subtitle />
                    <div className="flex flex-col gap-5">
                        <div>
                            <TextField name="username" type="text" label="Usuário" theme="filled" placeholder="Digite o seu usuário" />
                        </div>
                        <div>
                            <TextField name="password" type="password" label="Senha" theme="filled" placeholder="Digite a sua senha" />
                        </div>
                        <Button name="login" type="submit" disabled={isSubmitting} theme="beige" />
                    </div>
                </Form>
            )}
        </Formik>
    </div>
}
