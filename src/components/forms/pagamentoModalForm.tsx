import { Formik, Form } from "formik";
import * as Yup from "yup"
import { SelectField, TextField } from "../formikcustom/field";
import { Button } from "../button";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void;
}

export const PagamentoModalForm: React.FC<ModalProps> = ({ isOpen = false, onClose }) => {
    if (!isOpen) return null;
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
                                initialValues={
                                    {
                                        ultimoPagamento: "", matricula: "", data: "", dataNovoPagamento: ""
                                    }}
                                validationSchema={
                                    Yup.object(
                                        {
                                            ultimoPagamento: Yup.string().required("Campo de nome obrigatório"),
                                            matricula: Yup.string().required("Campo de senha obrigatório"),
                                            data: Yup.string().required("Campo de senha obrigatório"),
                                            dataNovoPagamento: Yup.string().required("Campo de senha obrigatório"),
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
                                            <TextField label="Último Pagamento" name="ultimoPagamento" theme="lined" type="text" />
                                        </div>
                                        <div>
                                            <TextField label="Matricula" name="matricula" theme="lined" placeholder="" type="password" />
                                        </div>
                                        <div>
                                            <TextField label="Valor" name="valor" theme="lined" placeholder="" type="number" />
                                        </div>
                                        <div>
                                            <TextField label="Novo Pagamento" name="novoPagamento" theme="lined" placeholder="" type="text" />
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