'use client'

import { Button, ErrorMessageAlert, Subtitle, SucessMessageAlert, TextField } from "@/components"
import { Formik, Form } from "formik"
import { useRouter } from "next/navigation"
import { useState } from "react"
import * as Yup from "yup"

export const LoginForm: React.FC = () => {

    const router = useRouter();
    const [SucessMessage, setSuccessMessage] = useState("")

    return <div className="">
        <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={
                Yup.object({
                    username: Yup.string().required("Nome de usuário obrigatório!"),
                    password: Yup.string().required("Senha de usuário obrigatório!"),
                })
            }   
            onSubmit={async (values, { setSubmitting, setErrors }) => {
                setSuccessMessage("Login realizado com sucesso!");
                setTimeout(() => {
                   router.push("/inicio");
                }, 1000);
                 
            }} >
            {({ isSubmitting }) => (
                <Form className="py-10 px-10 md:px-40 lg:px-20 mx-auto justify-center
                 flex flex-col gap-5 bg-[#063D38] 
                 lg:w-[40rem] lg:h-screen lg:rounded-bl-3xl lg:rounded-tl-3xl">
                    <Subtitle />
                    <div className="flex flex-col gap-5">
                        <div>
                            <TextField name="username" type="text" label="Usuário" theme="filled" placeholder="Digite o seu usuário" />
                            <ErrorMessageAlert name="username" component='div' />
                        </div>
                        <div>
                            <TextField name="password" type="password" label="Senha" theme="filled" placeholder="Digite a sua senha" />
                            <ErrorMessageAlert name="password" component='div' />
                        </div>
                        <Button name="login" type="submit" disabled={isSubmitting} theme="beige"/>
                        {SucessMessage&& <SucessMessageAlert SuccessMessage={SucessMessage}/>}
                    </div>
                </Form>
            )}
        </Formik>
    </div>
}