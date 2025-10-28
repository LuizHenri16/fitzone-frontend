import { useState, useEffect } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup"
import { SelectField, TextField } from "../formikcustom/field";
import { Button } from "../button";
import { ErrorMessageAlert, MessageAlertModal } from "../alerts"; 
import api from "@/services/api";

interface PaymentDTO {
    lastPayment: string;
    licenseType: string;
    price: number;
    
}

interface ClienteDetalhe {
    id: string;
    name: string;
    email: string;
    licenseType: string;
    price: number;
    lastPayment: string | null;
}

interface ClienteCombobox {
    id: string;
    name: string;
}

interface ModalProps {
    isOpen: boolean,
    onClose: () => void;
}

interface PagamentoValues {
    clienteId: string; 
    ultimoPagamento: string;
    matricula: string;
    valor: string;
    novoPagamento: string;
}

export const PagamentoModalForm: React.FC<ModalProps> = ({ isOpen = false, onClose }) => {
    const [listaClientes, setListaClientes] = useState<ClienteCombobox[]>([]);
    const [clienteSelecionado, setClienteSelecionado] = useState<ClienteDetalhe | null>(null);

    const [SucessMessage, setSuccessMessage] = useState("");
    const [SucessMessageModalIsOpen, setSuccessMessageModalIsOpen] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [ErrorMessageModalIsOpen, setErrorMessageModalIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            api.get<ClienteCombobox[]>("/customer/list/simple")
                .then(response => {
                    setListaClientes(response.data);
                })
                .catch(error => {
                    console.error("Erro ao carregar clientes:", error);
                });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const buscarDetalhesCliente = async (clienteId: string) => {
        if (!clienteId) {
            setClienteSelecionado(null);
            return;
        }

        try {
            const response = await api.get<ClienteDetalhe>(`/customer/${clienteId}/details`); 
            const cliente = response.data;

            setClienteSelecionado({
                id: cliente.id,
                name: cliente.name,
                email: cliente.email,
                licenseType: cliente.licenseType, 
                price: cliente.price,             
                lastPayment: cliente.lastPayment 
            });

        } catch (error) {
            console.error("Erro ao buscar detalhes do cliente:", error);
            setClienteSelecionado(null);
        }
    };

    const cadastrarPagamento = async (values: PagamentoValues, actions: FormikHelpers<PagamentoValues>) => {
        if (!clienteSelecionado) {
            setErrorMessage("Selecione um cliente válido para continuar.");
            setErrorMessageModalIsOpen(true);
            actions.setSubmitting(false);
            return;
        }

        actions.setSubmitting(true);

        const pagamentoPayload = {
            customerId: clienteSelecionado.id,
        
            valor: clienteSelecionado.price,
            licenseType: clienteSelecionado.licenseType
        };

        try {
            const response = await api.post("/finance/payment/register", pagamentoPayload);
            
            if (response.status === 200 || response.status === 201) {
                setSuccessMessage("Pagamento registrado com sucesso!");
                setSuccessMessageModalIsOpen(true);
                
                actions.resetForm();
                
                setTimeout(() => {
                    setSuccessMessageModalIsOpen(false);
                    onClose();
                }, 2000);
            }

        } catch (error: any) {
            const message = error.response?.data?.error || "Erro desconhecido ao registrar pagamento.";
            setErrorMessage(message);
            setErrorMessageModalIsOpen(true);
        } finally {
            actions.setSubmitting(false);
        }
    };


    const initialValues: PagamentoValues = {
        clienteId: "",
        ultimoPagamento: clienteSelecionado?.lastPayment || "Não encontrado", 
        matricula: clienteSelecionado?.licenseType || "Não definido", 
        valor: clienteSelecionado?.price ? `R$ ${clienteSelecionado.price.toFixed(2).replace('.', ',')}` : "Não definido", 
        novoPagamento: new Date().toLocaleDateString('pt-BR')
    };

    const validationSchema = Yup.object({
        clienteId: Yup.string().required("Selecione um cliente."),
    });


    return (
        <div >
            {isOpen && (
                <div>
                    <div className="fixed inset-0 z-50 flex items-center px-5 justify-center bg-black/20 backdrop-blur-sm">
                        <div className="w-full max-w-[50rem] bg-[#F3F3F3] rounded-2xl shadow-2xl px-6 py-8 max-h-[90vh] overflow-y-auto">
                            <div className="mb-6 flex justify-between">
                                <h2 className="font-bold text-3xl text-[#116343]">Novo Pagamento</h2>
                                <button onClick={onClose} className="text-3xl hover:text-[#c5c5c5] cursor-pointer">✕</button>
                            </div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={cadastrarPagamento}
                                enableReinitialize={true} 
                            >
                                {({ isSubmitting, setFieldValue }) => (
                                    <Form>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            
                                            <div className="flex flex-col gap-1">
                                                <label className="font-bold text-lg text-[#6B3E23]"> Cliente </label>
                                                <select
                                                className="w-full cursor-pointer shadow-md bg-white rounded-2xl border-2 border-[#C1C1C1] px-5 py-3 text-[#6B3E23] font-medium outline-none text-center" 
                                                    name="clienteId" 
                                                    onChange={(e: any) => {
                                                        const id = e.target.value;
                                                        setFieldValue("clienteId", id);
                                                        buscarDetalhesCliente(id);
                                                    }}
                                                >
                                                    <option value="">Selecione:</option>
                                                    {listaClientes.map(cliente => (
                                                        <option key={cliente.id} value={cliente.id}>
                                                            {cliente.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ErrorMessageAlert name="clienteId" component="div" />
                                            </div>
                                            
                                            <div>
                                                <TextField 
                                                    label="Último Pagamento" 
                                                    name="ultimoPagamento" 
                                                    theme="lined" 
                                                    type="text" 
                                                />
                                            </div>
                                            <div>
                                                <TextField 
                                                    label="Tipo de Matrícula" 
                                                    name="matricula" 
                                                    theme="lined" 
                                                    type="text" 
                                                />
                                            </div>
                                            <div>
                                                <TextField 
                                                    label="Valor do Pagamento" 
                                                    name="valor" 
                                                    theme="lined" 
                                                    type="text" 
                                                />
                                            </div>
                                            <div>
                                                <TextField 
                                                    label="Novo Pagamento" 
                                                    name="novoPagamento" 
                                                    theme="lined" 
                                                    type="text" 
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="mt-5 flex flex-col gap-4 md:flex-row">
                                            <Button name="Confirmar" type="submit" theme="brown" disabled={isSubmitting || !clienteSelecionado}></Button>
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