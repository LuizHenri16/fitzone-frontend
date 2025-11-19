import { Formik, Form } from "formik";
import * as Yup from "yup"
import { SelectField, TextField } from "../formikcustom/field";
import { Button } from "../button";
import { ErrorMessageAlert, MessageAlertModal } from "../alerts";
import api from "@/services/api";
import { useState } from "react";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void;
}

export const UsuarioModalForm: React.FC<ModalProps> = ({ isOpen = false, onClose }) => {
    const [SucessMessage, setSuccessMessage] = useState("");
    const [SuccessMessageModalIsOpen, setSuccessMessageModalIsOpen] = useState(false);

    const [ErrorMessage, setErrorMessage] = useState("");
    const [ErrorMessageModalIsOpen, setErrorMessageModalIsOpen] = useState(false);

    if (!isOpen) return null;
    return (
        <div >
            {isOpen && (
                <div>
                    <div className="fixed inset-0 z-50 flex items-center px-5 justify-center bg-black/20 backdrop-blur-sm">
                        <div className="w-full max-w-[50rem] bg-[#F3F3F3] rounded-2xl shadow-2xl px-6 py-8 max-h-[90vh] overflow-y-auto">
                            <div className="mb-6 flex justify-between">
                                <h2 className="font-bold text-3xl text-[#116343]">Cadastrar Usuário</h2>
                                <button onClick={onClose} className="text-3xl hover:text-[#c5c5c5] cursor-pointer">✕</button>
                            </div>
                            <Formik
                                initialValues={
                                    {
                                        username: "", password: "", confirmPassword: "", access: ""
                                    }}
                                validationSchema={
                                    Yup.object(
                                        {
                                            username: Yup.string().required("Campo de nome obrigatório"),
                                            password: Yup.string().required("Campo de senha obrigatório"),
                                            confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'As senhas devem corresponder').required('Confirmação de senha é obrigatória'),
                                            access: Yup.string().oneOf(["Total", "Parcial"], "Selecione um nível de acesso")
                                        }
                                    )}
                                onSubmit={
                                    async (values, { setSubmitting, resetForm }) => {
                                        setSubmitting(true);
                                        api.post("/user", values)
                                            .then(response => {
                                                if (response.status === 201) {
                                                    setSuccessMessage("Usuário cadastrado com sucesso");
                                                    setSuccessMessageModalIsOpen(true);

                                                    resetForm();
                                                    setSubmitting(false);

                                                    setTimeout(() => {
                                                        onClose();
                                                        setSuccessMessageModalIsOpen(false)
                                                        window.location.reload()
                                                    }, 2000);
                                                }
                                            })
                                            .catch(error => {
                                                if (error.response) {
                                                    const message = error.response.data?.message || "Erro desconhecido";
                                                    setErrorMessage(message);
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
                                                <TextField label="Senha" name="password" theme="lined" placeholder="Digite o nome do aluno" type="password" />
                                                <ErrorMessageAlert name="password" component='div' />
                                            </div>
                                            <div>
                                                <TextField label="Confirmar Senha" name="confirmPassword" theme="lined" placeholder="Digite o nome do aluno" type="password" />
                                                <ErrorMessageAlert name="confirmPassword" component='div' />
                                            </div>
                                            <div className="">
                                                <SelectField theme="lined" name="access" htmlFor="nivelAcesso" label="Nível de Acesso" options={["Selecionar", "Total", "Parcial"]} />
                                                <ErrorMessageAlert name="access" component='div' />
                                            </div>
                                        </div>

                                        <div className="mt-5 flex flex-col gap-4 md:flex-row">
                                            <Button name="Confirmar" type="submit" theme="brown"></Button>
                                            <Button name="Cancelar" theme="beige" onClick={onClose} />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}
            {SuccessMessageModalIsOpen && (<MessageAlertModal title="Sucesso" message={SucessMessage} isOpen={true} onCancel={() => setSuccessMessageModalIsOpen(false)} />)}
            {ErrorMessageModalIsOpen && (<MessageAlertModal title="Erro" message={ErrorMessage} isOpen={true} onCancel={() => setErrorMessageModalIsOpen(false)} />)}
        </div>
    )
}