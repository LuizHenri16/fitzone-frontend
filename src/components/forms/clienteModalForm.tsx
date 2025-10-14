import { Form, Formik } from "formik";
import { useState } from "react"
import { Button } from "../button";
import * as Yup from "yup"
import { SelectField, TextField } from "../formikcustom/field";
import { ErrorMessageAlert } from "../alerts";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void;
}

export const ClienteModalForm: React.FC<ModalProps> = ({ isOpen = false, onClose }) => {
    if (!isOpen) return null;
    return (
        <div >
            {isOpen && (
                <div>
                    <div className="fixed inset-0 z-50 flex items-center px-5 justify-center bg-black/50 backdrop-blur-sm">
                        <div className="w-full max-w-[50rem] bg-[#F3F3F3] rounded-2xl shadow-2xl px-6 py-8 max-h-[90vh] overflow-y-auto">
                            <div className="mb-6 flex justify-between">
                                <h2 className="font-bold text-3xl text-[#116343]">Cadastrar Aluno</h2>
                                <button onClick={onClose} className="text-3xl hover:text-[#c5c5c5] cursor-pointer">✕</button>
                            </div>
                            <Formik
                                initialValues={
                                    {
                                        name: "", cpf: "", dataNascimento: "",
                                        telefone: "", telefoneEmergencia: "", email: "",
                                        endereco: "", peso: 0.00, altura: 0.00, historicoSaude: "",
                                        matricula: ""
                                    }}
                                validationSchema={
                                    Yup.object(
                                        {
                                            name: Yup.string().required("Campo de nome obrigatório"),
                                            cpf: Yup.string().required("Campo de cpf obrigatório"),
                                            dataNascimento: Yup.string().required("Digite a data de nascimento"),
                                            telefone: Yup.string().min(15, "Digite um telefone válido").required("Campo de telefone obrigatório"),
                                            telefoneEmergencia: Yup.string().min(15, "Digite um telefone válido").required("Campo de telefone obrigatório"),
                                            email: Yup.string().email("E-mail inválido").required("Campo de e-mail obrigatório"),
                                            endereco: Yup.string().required("Endereço do aluno obrigatório!"),
                                            peso: Yup.number().required("Informe o peso do aluno"),
                                            altura: Yup.number().required("Informe a altura do aluno"),
                                            historicoSaude: Yup.string().required("Indique o histório de saúde do aluno"),
                                            matricula: Yup.string().oneOf(["Quizenal", "Mensal"], "Selecione uma matricula")
                                        }
                                    )}
                                onSubmit={
                                    async (values, { setSubmitting, resetForm }) => {
                                        setSubmitting(true);
                                        try {

                                            resetForm()
                                        } catch (error: any) {

                                        } finally {

                                        }
                                    }}>
                                {({ isSubmitting }) => (
                                    <Form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <TextField label="Nome Completo" name="name" theme="lined" placeholder="Digite o nome do aluno" type="text" />
                                            <ErrorMessageAlert name="name" component='div' />
                                        </div>

                                        <div>
                                            <TextField mask="XXX.XXX.XXX-XX" label="CPF" name="cpf" theme="lined" placeholder="ex: 213.313.151-22" type="text" />
                                            <ErrorMessageAlert name="cpf" component='div' />
                                        </div>

                                        <div>
                                            <TextField mask="XX/XX/XXXX" label="Data de Nascimento" name="dataNascimento" theme="lined" placeholder="ex: 21/02/2000" type="text" />
                                            <ErrorMessageAlert name="dataNascimento" component='div' />
                                        </div>

                                        <div>
                                            <TextField mask="(XX) XXXXX-XXXX" label="Telefone" name="telefone" theme="lined" placeholder="ex: (71) 92334-2123" type="text" />
                                            <ErrorMessageAlert name="telefone" component='div' />
                                        </div>

                                        <div>
                                            <TextField mask="(XX) XXXXX-XXXX" label="Telefone de Emergência" name="telefoneEmergencia" theme="lined" placeholder="ex: (71) 92334-2123" type="text" />
                                            <ErrorMessageAlert name="telefoneEmergencia" component='div' />
                                        </div>

                                        <div>
                                            <TextField label="E-mail" name="email" theme="lined" placeholder="Digite o email do aluno" type="text" />
                                            <ErrorMessageAlert name="email" component='div' />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <TextField label="Peso" name="peso" theme="lined" placeholder="" type="text" />
                                                <ErrorMessageAlert name="peso" component='div' />
                                            </div>
                                            <div>
                                                <TextField label="Altura" name="altura" theme="lined" placeholder="" type="text" />
                                                <ErrorMessageAlert name="altura" component='div' />
                                            </div>
                                        </div>
                                        <div>
                                            <TextField label="Histórico de Saúde" name="historicoSaude" theme="lined" placeholder="Digite o histórico de saúde" type="text" />
                                            <ErrorMessageAlert name="historicoSaude" component='div' />
                                        </div>
                                        <div className="">
                                            <SelectField theme="lined" name="matricula" htmlFor="matricula" label="Matrícula" options={["Selecionar", "Quizenal", "Mensal"]} />
                                            <ErrorMessageAlert name="matricula" component='div' />
                                        </div>
                                    </Form>
                                )}

                            </Formik>
                            <div className="mt-5 flex flex-col gap-4 md:flex-row">
                                <Button name="Confirmar" type="submit" theme="brown"></Button>
                                <Button name="Cancelar" theme="beige" onClick={onClose} />
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}