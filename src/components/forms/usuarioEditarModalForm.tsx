'use client'

import { Formik, Form } from "formik";
import * as Yup from "yup"
import { SelectField, TextField } from "../formikcustom/field";
import { Button } from "../button";
import { ErrorMessageAlert, MessageAlertModal } from "../alerts";
import api from "@/services/api";
import { useState } from "react";
import React from "react"; 
import { createPortal } from "react-dom"; // ✨ Importante: Importar createPortal do react-dom

interface Usuario {
    id: string;
    username: string;
    access: string;
}

interface ModalProps {
    isOpen: boolean,
    onClose: () => void;
    usuario?: Usuario;
    onSuccess: () => void;
}

export const UsuarioEditarModalForm: React.FC<ModalProps> = ({ isOpen = false, onClose, usuario, onSuccess }) => {
    const [SucessMessage, setSuccessMessage] = useState("");
    const [SuccessMessageModalIsOpen, setSuccessMessageModalIsOpen] = useState(false);

    const [ErrorMessage, setErrorMessage] = useState("");
    const [ErrorMessageModalIsOpen, setErrorMessageModalIsOpen] = useState(false);

    const validationSchema = Yup.object({
        username: Yup.string().required("Campo de nome obrigatório"),
        password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
        confirmPassword: Yup.string()
            .when('password', {
                is: (val: string) => (val && val.length > 0),
                then: (schema) => schema
                    .oneOf([Yup.ref('password')], 'As senhas devem corresponder')
                    .required('Confirmação de senha é obrigatória'),
                otherwise: (schema) => schema.notRequired()
            }),
        access: Yup.string()
            .oneOf(["Total", "Parcial"], "Selecione um nível de acesso válido")
            .required("Campo de nível de acesso obrigatório")
    });

    if (!isOpen) return null;

    const AlertModals = () => {
        if (typeof document === 'undefined') return null; 
        const successModal = SuccessMessageModalIsOpen && (
            <MessageAlertModal
                title="Sucesso"
                message={SucessMessage}
                isOpen={SuccessMessageModalIsOpen}
                onCancel={() => setSuccessMessageModalIsOpen(false)}
            />
        );
        
        const errorModal = ErrorMessageModalIsOpen && (
            <MessageAlertModal
                title="Erro"
                message={ErrorMessage}
                isOpen={ErrorMessageModalIsOpen}
                onCancel={() => setErrorMessageModalIsOpen(false)}
            />
        );
        return createPortal(
            <>
                {successModal}
                {errorModal}
            </>,
            document.body
        );
    };


    return (
        <div className="fixed inset-0 z-30 flex items-center px-5 justify-center bg-black/10 backdrop-blur-sm">
            <div className="w-full max-w-[50rem] bg-[#F3F3F3] rounded-2xl shadow-2xl px-6 py-8 max-h-[90vh] overflow-y-auto">
                <div className="mb-6 flex justify-between">
                    <h2 className="font-bold text-3xl text-[#116343]">Editar Dados do Usuário</h2>
                    <button onClick={onClose} className="text-3xl hover:text-[#c5c5c5] cursor-pointer">✕</button>
                </div>
                <Formik
                    initialValues={
                        {
                            username: usuario?.username || "",
                            password: "",
                            confirmPassword: "",
                            access: usuario?.access || ""
                        }}
                    validationSchema={validationSchema}
                    onSubmit={
                        async (values, { setSubmitting, resetForm }) => {
                            setSubmitting(true);

                            api.put(`/user/${usuario?.id}`, values)
                                .then(response => {
                                    if (response.status === 200) {
                                        setSuccessMessage("Usuário editado com sucesso");
                                        setSuccessMessageModalIsOpen(true);

                                        resetForm();
                                        setSubmitting(false);
                                        onSuccess();

                                        setTimeout(() => {
                                            onClose();
                                            window.location.reload()
                                        }, 2000);
                                    }
                                })
                                .catch(error => {
                                    setSubmitting(false);
                                    if (error.response) {
                                        const message = error.response.data?.error || "Erro desconhecido ao editar o usuário.";
                                        setErrorMessage(message);
                                        setErrorMessageModalIsOpen(true);
                                    } else {
                                        setErrorMessage("Erro de rede ou conexão com a API.");
                                        setErrorMessageModalIsOpen(true);
                                    }
                                })
                        }}>
                    {({ isSubmitting }) => (
                        <Form className="">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <TextField label="Nome de Usuário" name="username" theme="lined" placeholder="Digite o nome do aluno" type="text" />
                                    <ErrorMessageAlert name="username" component='div' />
                                </div>
                                <div>
                                    <TextField label="Senha" name="password" theme="lined" placeholder="Deixe em branco para não alterar" type="password" />
                                    <ErrorMessageAlert name="password" component='div' />
                                </div>
                                <div>
                                    <TextField label="Confirmar Senha" name="confirmPassword" theme="lined" placeholder="Confirme a nova senha" type="password" />
                                    <ErrorMessageAlert name="confirmPassword" component='div' />
                                </div>
                                <div className="">
                                    <SelectField theme="lined" name="access" htmlFor="nivelAcesso" label="Nível de Acesso" options={["Selecionar", "Total", "Parcial"]} />
                                    <ErrorMessageAlert name="access" component='div' />
                                </div>
                            </div>

                            <div className="mt-5 flex flex-col gap-4 md:flex-row">
                                <Button name="Confirmar" type="submit" theme="brown" disabled={isSubmitting}></Button>
                                <Button name="Cancelar" theme="beige" onClick={onClose} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <AlertModals /> 
        </div>
    )
}