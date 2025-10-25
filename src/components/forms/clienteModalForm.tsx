import { Form, Formik } from "formik";
import { useState } from "react";
import { Button } from "../button";
import * as Yup from "yup";
import { SelectField, TextField } from "../formikcustom/field";
import { ErrorMessageAlert, MessageAlertModal } from "../alerts";
import axios from "axios";
import api from "@/services/api";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ClienteModalForm: React.FC<ModalProps> = ({ isOpen = false, onClose }) => {
    const [SucessMessage, setSuccessMessage] = useState("");
    const [SucessMessageModalIsOpen, setSuccessMessageModalIsOpen] = useState(false);

    const [ErrorMessage, setErrorMessage] = useState("");
    const [ErrorMessageModalIsOpen, setErrorMessageModalIsOpen] = useState(false);

    if (!isOpen) return null;

    return (
        <div>
            <div className="fixed inset-0 z-60 flex items-center px-5 justify-center bg-black/10 backdrop-blur-sm">
                <div className="w-full max-w-[50rem] bg-[#F3F3F3] rounded-2xl shadow-2xl px-6 py-8 max-h-[90vh] overflow-y-auto">
                    <div className="mb-6 flex justify-between">
                        <h2 className="font-bold text-3xl text-[#116343]">Cadastrar Aluno</h2>
                        <button onClick={onClose} className="text-3xl hover:text-[#c5c5c5] cursor-pointer">✕</button>
                    </div>

                    <Formik
                        initialValues={{
                            name: "", cpf: "", birthday: "",
                            telephoneNumber: "", EmergencyTelephoneNumber: "", email: "",
                            address: "", weight: 0.00, height: 0.00, healthHistory: "",
                            license: ""
                        }}

                        validationSchema={Yup.object({
                            name: Yup.string().required("Campo de nome obrigatório"),
                            cpf: Yup.string().required("Campo de cpf obrigatório"),
                            birthday: Yup.string().required("Digite a data de nascimento"),
                            telephoneNumber: Yup.string().min(15, "Digite um telefone válido").required("Campo de telefone obrigatório"),
                            EmergencyTelephoneNumber: Yup.string().min(15, "Digite um telefone válido").required("Campo de telefone obrigatório"),
                            email: Yup.string().email("E-mail inválido").required("Campo de e-mail obrigatório"),
                            address: Yup.string().required("Endereço do aluno obrigatório!"),
                            weight: Yup.number().required("Informe o peso do aluno"),
                            height: Yup.number().required("Informe a altura do aluno"),
                            healthHistory: Yup.string().required("Indique o histório de saúde do aluno"),
                            license: Yup.string().oneOf(["Quizenal", "Mensal"], "Selecione uma matrícula")
                        })}

                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            setSubmitting(true);

                            api.post("/customer", values)
                                .then(response => {
                                    setSuccessMessage("Aluno cadastrado com sucesso");
                                    setSuccessMessageModalIsOpen(true);

                                    resetForm();
                                    setSubmitting(false);

                                    setTimeout(() => {
                                        onClose();
                                        setSuccessMessageModalIsOpen(false)
                                    }, 2000);
                                })
                                .catch(error => {
                                    if (error.response) {
                                        const message = error.response.data?.error || "Erro desconhecido";
                                        setErrorMessage(message);
                                        setErrorMessageModalIsOpen(true);
                                    }
                                })
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <TextField label="Nome Completo" name="name" theme="lined" placeholder="Digite o nome do aluno" type="text" />
                                        <ErrorMessageAlert name="name" component="div" />
                                    </div>
                                    <div>
                                        <TextField mask="XXX.XXX.XXX-XX" label="CPF" name="cpf" theme="lined" placeholder="ex: 213.313.151-22" type="text" />
                                        <ErrorMessageAlert name="cpf" component="div" />
                                    </div>
                                    <div>
                                        <TextField mask="XX/XX/XXXX" label="Data de Nascimento" name="birthday" theme="lined" placeholder="ex: 21/02/2000" type="text" />
                                        <ErrorMessageAlert name="birthday" component="div" />
                                    </div>
                                    <div>
                                        <TextField mask="(XX) XXXXX-XXXX" label="Telefone" name="telephoneNumber" theme="lined" placeholder="ex: (71) 92334-2123" type="text" />
                                        <ErrorMessageAlert name="telephoneNumber" component="div" />
                                    </div>
                                    <div>
                                        <TextField mask="(XX) XXXXX-XXXX" label="Telefone de Emergência" name="EmergencyTelephoneNumber" theme="lined" placeholder="ex: (71) 92334-2123" type="text" />
                                        <ErrorMessageAlert name="EmergencyTelephoneNumber" component="div" />
                                    </div>
                                    <div>
                                        <TextField label="E-mail" name="email" theme="lined" placeholder="Digite o email do aluno" type="text" />
                                        <ErrorMessageAlert name="email" component="div" />
                                    </div>
                                    <div>
                                        <TextField label="Endereço" name="address" theme="lined" placeholder="Digite o endereço do aluno" type="text" />
                                        <ErrorMessageAlert name="address" component="div" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <TextField label="Peso" name="weight" theme="lined" placeholder="" type="text" />
                                            <ErrorMessageAlert name="weight" component="div" />
                                        </div>
                                        <div>
                                            <TextField label="Altura" name="height" theme="lined" placeholder="" type="text" />
                                            <ErrorMessageAlert name="height" component="div" />
                                        </div>
                                    </div>

                                    <div>
                                        <TextField label="Histórico de Saúde" name="healthHistory" theme="lined" placeholder="Digite o histórico de saúde" type="text" />
                                        <ErrorMessageAlert name="healthHistory" component="div" />
                                    </div>
                                    <div>
                                        <SelectField theme="lined" name="license" htmlFor="matricula" label="Matrícula" options={["Selecionar", "Quizenal", "Mensal"]} />
                                        <ErrorMessageAlert name="license" component="div" />
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-col gap-4 md:flex-row md:col-span-2">
                                    <Button name="Confirmar" type="submit" theme="brown" disabled={isSubmitting} />
                                    <Button name="Cancelar" theme="beige" onClick={onClose} />
                                </div>
                            </Form>
                        )}
                    </Formik>
                    {SucessMessageModalIsOpen && (<MessageAlertModal title="Sucesso" message={SucessMessage} isOpen={true} onCancel={() => setSuccessMessageModalIsOpen(false)} />)}
                    {ErrorMessageModalIsOpen && (<MessageAlertModal title="Erro" message={ErrorMessage} isOpen={true} onCancel={() => setErrorMessageModalIsOpen(false)} />)}
                </div>
            </div>
        </div>
    );
};
