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

export const DespesaModalForm: React.FC<ModalProps> = ({ isOpen = false, onClose }) => {

    const [SucessMessage, setSuccessMessage] = useState("");
    const [SucessMessageModalIsOpen, setSuccessMessageModalIsOpen] = useState(false);

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
                                <h2 className="font-bold text-3xl text-[#116343]">Nova Despesa</h2>
                                <button onClick={onClose} className="text-3xl hover:text-[#c5c5c5] cursor-pointer">✕</button>
                            </div>
                            <Formik
                                initialValues={
                                    {
                                        description: "", value: "", date: ""
                                    }}
                                validationSchema={
                                    Yup.object(
                                        {
                                            description: Yup.string().required("Digite a descrição da despesa"),
                                            value: Yup.string().required("Digite o valor da despesa"),
                                            date: Yup.string().required("Digite a data da despesa"),
                                        }
                                    )}
                                onSubmit={
                                    async (values, { setSubmitting, resetForm }) => {
                                        setSubmitting(true);

                                        api.post("/finance/expense", values)
                                            .then(response => {
                                                if (response.status === 201) {
                                                    setSuccessMessage("Despesa cadastrada com sucesso");
                                                    setSuccessMessageModalIsOpen(true);

                                                    resetForm();
                                                    setSubmitting(false);
                                                    setTimeout(() => {
                                                        onClose();
                                                        setSuccessMessageModalIsOpen(false)

                                                    }, 2000);
                                                }
                                            })
                                            .catch(error => {
                                                if (error.response) {
                                                    const message = error.response.data?.error || "Erro desconhecido ao cadastrar despesa.";
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
                                                <TextField label="Descrição da Despesa" name="description" theme="lined" placeholder="Digite a descrição" type="text" />
                                                <ErrorMessageAlert name="description" component="div" />
                                            </div>
                                            <div>
                                                <TextField label="Valor" name="value" theme="lined" placeholder="R$ 0.00" type="number" />
                                                <ErrorMessageAlert name="value" component="div" />
                                            </div>
                                            <div>
                                                <TextField label="Data da Despesa" mask="XX/XX/XXXX" name="date" theme="lined" placeholder="ex: 10/02/2025" type="password" />
                                                <ErrorMessageAlert name="date" component="div" />
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
                    {SucessMessageModalIsOpen && (<MessageAlertModal title="Sucesso" message={SucessMessage} isOpen={true} onCancel={() => setSuccessMessageModalIsOpen(false)} />)}
                    {ErrorMessageModalIsOpen && (<MessageAlertModal title="Erro" message={ErrorMessage} isOpen={true} onCancel={() => setErrorMessageModalIsOpen(false)} />)}
                </div>

            )}
        </div>
    )
}