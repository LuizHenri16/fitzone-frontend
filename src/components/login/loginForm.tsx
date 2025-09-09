'use client'

import { Button, SelectField, Subtitle, TextField } from "@/components"
import { Formik, Form } from "formik"

export const LoginForm: React.FC = () => {
    return <div className="">
        <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
            }}
        >
            {({ isSubmitting }) => (
                <Form className="py-10 px-10 md:px-40
                                 flex flex-col gap-5 bg-[#063D38]">
                    <Subtitle />
                    <div>
                        <label className="text-[#FFF9ED] font-bold" htmlFor="username">Usuário</label>
                        <TextField name="username" type="text" theme="filled" placeholder="Digite o seu usuário"/>
                    </div>
                    <div>
                        <label className="text-[#FFF9ED] font-bold" htmlFor="username">Senha</label>
                        <TextField name="password" type="password" theme="filled" placeholder="Digite a sua senha"/>
                    </div>
                    <Button name="login" type="submit" disabled={isSubmitting} theme="beige" />
                </Form>
            )}
        </Formik>
    </div>
}
