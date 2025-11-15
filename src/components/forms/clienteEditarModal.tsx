import { Form, Formik } from "formik";
import { Button } from "../button";
import * as Yup from "yup";
import { SelectField, TextField } from "../formikcustom/field";
import { useEffect, useState } from "react";
import { ErrorMessageAlert, MessageAlertModal } from "../alerts";
import api from "@/services/api";
import { formatIsoToMaskedDate } from "@/services/format/formatDate";
import { useRouter } from "next/navigation";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    idAluno?: string;
}

interface Aluno {
    id: number;
    name: string;
    cpf?: string;
    birthday: string;
    customerContact: {
        telephoneValue: string;
        emergencyTelephoneValue: string;
    };
    customerComplementInformation: {
        weight: number;
        height: number;
        healthhistory: string;
    };
    customerAddress: {
        address: string;
    };
    email?: string;
    status?: string,
    license: {
        id: number;
        license: string;
        price: number;
    };
}

export const ClienteEditarModalForm: React.FC<ModalProps> = ({ isOpen = false, onClose, idAluno }) => {
    const [alunoEditar, setAlunoEditar] = useState<Aluno | null>(null);
    const [loading, setLoading] = useState(false);

    const [SucessMessage, setSuccessMessage] = useState("");
    const [SucessMessageModalIsOpen, setSuccessMessageModalIsOpen] = useState(false);

    const [ErrorMessage, setErrorMessage] = useState("");
    const [ErrorMessageModalIsOpen, setErrorMessageModalIsOpen] = useState(false);

    useEffect(() => {
        if (idAluno) {
            setLoading(true);

            api.get(`/customer/${idAluno}`)
                .then((response) => {
                    const data = response.data.customer;
                    const alunoComBirthday = {
                        ...data,
                        birthday: data.customerBirthDay
                    };
                    setAlunoEditar(alunoComBirthday);
                })
                .catch((error) => {
                    if (error.response) {
                        const message = error.response.data?.error || "Erro desconhecido ao montar os campos";
                        setErrorMessage(message);
                        setErrorMessageModalIsOpen(true);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [idAluno]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center px-5 justify-center bg-black/10 backdrop-blur-md">
            <div className="w-full max-w-[50rem] bg-[#F3F3F3] rounded-2xl shadow-md px-6 py-8 max-h-[90vh] overflow-y-auto">
                <div className="mb-6 flex justify-between">
                    <h2 className="font-bold text-3xl text-[#116343]">Editar dados do Aluno</h2>
                    <button onClick={onClose} className="text-3xl hover:text-[#c5c5c5] cursor-pointer">✕</button>
                </div>

                {loading || !alunoEditar ? (
                    <div className="text-center py-10">Carregando dados do aluno...</div>
                ) : (
                    <Formik
                        initialValues={{
                            id: alunoEditar.id,
                            name: alunoEditar.name,
                            cpf: alunoEditar.cpf ?? "",
                            birthday: formatIsoToMaskedDate(alunoEditar.birthday),
                            telephoneNumber: alunoEditar.customerContact.telephoneValue,
                            emergencyTelephoneNumber: alunoEditar.customerContact.emergencyTelephoneValue,
                            email: alunoEditar.email ?? "",
                            address: alunoEditar.customerAddress.address,
                            weight: alunoEditar.customerComplementInformation.weight,
                            height: alunoEditar.customerComplementInformation.height,
                            healthHistory: alunoEditar.customerComplementInformation.healthhistory,
                            license: alunoEditar.license.license,
                            status: alunoEditar.status ?? ""
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string().required("Campo de nome obrigatório"),
                            cpf: Yup.string().min(14, "Digite um CPF válido").required("Campo de cpf obrigatório"),
                            birthday: Yup.string().min(10, "Data de nascimento inválida").required("Digite a data de nascimento"),
                            telephoneNumber: Yup.string().min(15, "Digite um telefone válido").required("Campo de telefone obrigatório"),
                            emergencyTelephoneNumber: Yup.string().min(15, "Digite um telefone válido").required("Campo de telefone de emergência obrigatório"),
                            email: Yup.string().email("E-mail inválido").required("Campo de e-mail obrigatório"),
                            address: Yup.string().required("Endereço do aluno obrigatório!"),
                            weight: Yup.number().typeError("O peso deve ser um número").required("Informe o peso do aluno"),
                            height: Yup.number().typeError("A altura deve ser um número").required("Informe a altura do aluno"),
                            healthHistory: Yup.string().required("Indique o histório de saúde do aluno"),
                            license: Yup.string().oneOf(["Selecionar", "Quizenal", "Mensal"], "Selecione uma matrícula").required("Campo obrigatório"),
                            status: Yup.string().oneOf(["Selecionar", "Ativo", "Inativo"], "Selecione um status").required("Campo obrigatório"),
                        })}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            setSubmitting(true);

                            const submitValues = {
                                ...values,
                                birthDay: values.birthday,
                                license: values.license,
                            };

                            api.put(`/customer/${idAluno}`, submitValues)
                                .then(response => {
                                    if (response.status === 200) {
                                        setSuccessMessage("Aluno editado com sucesso");
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
                                    setSubmitting(false);
                                    if (error.response) {
                                        const message = error.response.data?.error || "Erro desconhecido ao editar o aluno.";
                                        setErrorMessage(message);
                                        setErrorMessageModalIsOpen(true);
                                    } else {
                                        setErrorMessage("Erro de rede ou conexão com a API.");
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
                                        <TextField mask="(XX) XXXXX-XXXX" label="Telefone de Emergência" name="emergencyTelephoneNumber" theme="lined" placeholder="ex: (71) 92334-2123" type="text" />
                                        <ErrorMessageAlert name="emergencyTelephoneNumber" component="div" />
                                    </div>

                                    <div>
                                        <TextField label="E-mail" name="email" theme="lined" placeholder="Digite o email do aluno" type="text" />
                                        <ErrorMessageAlert name="email" component="div" />
                                    </div>

                                    <div>
                                        <TextField label="Endereço" name="address" theme="lined" placeholder="Digite o endereço do aluno" type="text" />
                                        <ErrorMessageAlert name="address" component="div" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <TextField label="Peso" name="weight" theme="lined" placeholder="" type="text" />
                                            <ErrorMessageAlert name="weight" component="div" />
                                        </div>
                                        <div>
                                            <TextField label="Altura" name="height" theme="lined" placeholder="" type="text" />
                                            <ErrorMessageAlert name="height" component="div" />
                                        </div>
                                    </div>

                                    <div className="">
                                        <TextField label="Histórico de Saúde" name="healthHistory" theme="lined" placeholder="Digite o histórico de saúde" type="text" />
                                        <ErrorMessageAlert name="healthHistory" component="div" />
                                    </div>

                                    <div className="">
                                        <SelectField theme="lined" name="license" htmlFor="matricula" label="Matrícula" options={["Selecionar", "Quizenal", "Mensal"]} />
                                        <ErrorMessageAlert name="license" component="div" />
                                    </div>

                                    <div className="">
                                        <SelectField theme="lined" name="status" htmlFor="matricula" label="Status" options={["Selecionar", "Ativo", "Inativo"]} />
                                        <ErrorMessageAlert name="status" component="div" />
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-col gap-4 md:flex-row col-span-2">
                                    <Button name="Confirmar" type="submit" theme="brown" disabled={isSubmitting} />
                                    <Button name="Cancelar" theme="beige" onClick={onClose} />
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
                {SucessMessageModalIsOpen && (<MessageAlertModal title="Sucesso" message={SucessMessage} isOpen={true} onCancel={() => setSuccessMessageModalIsOpen(false)} />)}
                {ErrorMessageModalIsOpen && (<MessageAlertModal title="Erro" message={ErrorMessage} isOpen={true} onCancel={() => setErrorMessageModalIsOpen(false)} />)}
            </div>
        </div>
    );
};