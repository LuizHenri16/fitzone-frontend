import { useState, useEffect } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { TextField } from "../formikcustom/field";
import { Button } from "../button";
import { ErrorMessageAlert, MessageAlertModal } from "../alerts";
import api from "@/services/api";

interface ClienteDetalhe {
    id: string;
    name: string;
    email: string;
    license: {
        license: string;
        price: number;
    };
    lastPayment: string | null;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface PagamentoValues {
    clienteId: string;
    lastPayment: string;
    license: string;
    price: string;
    newPayment: string;
}

export const PagamentoModalForm: React.FC<ModalProps> = ({ isOpen = false, onClose }) => {
    const [listaClientes, setListaClientes] = useState<ClienteDetalhe[]>([]);
    const [clienteDetalhe, setClienteDetalhe] = useState<ClienteDetalhe | null>(null);

    const [SucessMessage, setSuccessMessage] = useState("");
    const [SucessMessageModalIsOpen, setSuccessMessageModalIsOpen] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [ErrorMessageModalIsOpen, setErrorMessageModalIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setClienteDetalhe(null);
            api.get<ClienteDetalhe[]>("/customer/payment")
                .then((response) => setListaClientes(response.data))
                .catch((error) => {

                });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const buscarDetalhesCliente = async (
        clienteId: string,
        setFieldValue: (field: string, value: any) => void
    ) => {
        if (!clienteId) {
            setClienteDetalhe(null);
            setFieldValue("lastPayment", "");
            setFieldValue("license", "");
            setFieldValue("price", "");
            return;
        }

        try {
            const response = await api.get<{customer: ClienteDetalhe}>(`/customer/${clienteId}`);
            const data = response.data.customer;
            setClienteDetalhe(data);

            setFieldValue(
                "lastPayment",
                data.lastPayment
                    ? new Date(data.lastPayment).toLocaleDateString("pt-BR")
                    : "Não encontrado"
            );
            setFieldValue("license", data.license.license);
            setFieldValue(
                "price",
                data.license.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })
            );
        } catch (error) {
            console.error("Erro ao buscar detalhes do cliente:", error);
            setClienteDetalhe(null);
        }
    };

    const cadastrarPagamento = async (
        values: PagamentoValues,
        actions: FormikHelpers<PagamentoValues>
    ) => {
        if (!values.clienteId) {
            setErrorMessage("Selecione um cliente válido para continuar.");
            setErrorMessageModalIsOpen(true);
            actions.setSubmitting(false);
            return;
        }

        try {
            const response = await api.post(`/finance/payment/${values.clienteId}`);
            if (response.status === 200 || response.status === 201) {
                setSuccessMessage("Pagamento registrado com sucesso!");
                setSuccessMessageModalIsOpen(true);

                actions.resetForm();
                setClienteDetalhe(null);

                setTimeout(() => {
                    setSuccessMessageModalIsOpen(false);
                    onClose();
                }, 2000);
            }
        } catch (error: any) {
            const message =
                error.response?.data?.error ||
                "Erro desconhecido ao registrar pagamento.";
            setErrorMessage(message);
            setErrorMessageModalIsOpen(true);
        } finally {
            actions.setSubmitting(false);
        }
    };

    const initialValues: PagamentoValues = {
        clienteId: "",
        lastPayment: "",
        license: "",
        price: "",
        newPayment: new Date().toLocaleDateString("pt-BR"),
    };

    const validationSchema = Yup.object({
        clienteId: Yup.string().required("Selecione um cliente."),
    });

    return (
        <div>
            {isOpen && (
                <div>
                    <div className="fixed inset-0 z-50 flex items-center px-5 justify-center bg-black/20 backdrop-blur-sm">
                        <div className="w-full max-w-[50rem] bg-[#F3F3F3] rounded-2xl shadow-2xl px-6 py-8 max-h-[90vh] overflow-y-auto">
                            <div className="mb-6 flex justify-between">
                                <h2 className="font-bold text-3xl text-[#116343]">
                                    Novo Pagamento
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-3xl hover:text-[#c5c5c5] cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={cadastrarPagamento}
                            >
                                {({ isSubmitting, setFieldValue, values }) => (
                                    <Form>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {/* Select Cliente */}
                                            <div className="flex flex-col gap-1">
                                                <label className="font-bold text-lg text-[#6B3E23]">
                                                    Cliente
                                                </label>
                                                <select
                                                    className="w-full cursor-pointer shadow-md bg-white rounded-2xl border-2 border-[#C1C1C1] px-5 py-3 text-[#6B3E23] font-medium outline-none text-center"
                                                    name="clienteId"
                                                    value={values.clienteId}
                                                    onChange={(e) => {
                                                        const id = e.target.value;
                                                        setFieldValue("clienteId", id);
                                                        buscarDetalhesCliente(id, setFieldValue);
                                                    }}
                                                >
                                                    <option value="">Selecione:</option>
                                                    {listaClientes.map((cliente) => (
                                                        <option key={cliente.id} value={cliente.id}>
                                                            {cliente.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ErrorMessageAlert name="clienteId" component="div" />
                                            </div>

                                            <TextField
                                                label="Último Pagamento"
                                                name="lastPayment"
                                                theme="lined"
                                                type="text"

                                            />

                                            <TextField
                                                label="Tipo de Matrícula"
                                                name="license"
                                                theme="lined"
                                                type="text"

                                            />

                                            <TextField
                                                label="Valor do Pagamento"
                                                name="price"
                                                theme="lined"
                                                type="text"

                                            />

                                            <TextField
                                                label="Novo Pagamento"
                                                name="newPayment"
                                                theme="lined"
                                                type="text"

                                            />
                                        </div>

                                        <div className="mt-5 flex flex-col gap-4 md:flex-row">
                                            <Button
                                                name="Confirmar"
                                                type="submit"
                                                theme="brown"
                                                disabled={isSubmitting || !values.clienteId}
                                            />
                                            <Button name="Cancelar" theme="beige" onClick={onClose} />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>

                    {SucessMessageModalIsOpen && (
                        <MessageAlertModal
                            title="Sucesso"
                            message={SucessMessage}
                            isOpen={true}
                            onCancel={() => setSuccessMessageModalIsOpen(false)}
                        />
                    )}

                    {ErrorMessageModalIsOpen && (
                        <MessageAlertModal
                            title="Erro"
                            message={ErrorMessage}
                            isOpen={true}
                            onCancel={() => setErrorMessageModalIsOpen(false)}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
