import { Formik, Form } from "formik";
import * as Yup from "yup"
import { SelectField, TextField } from "../formikcustom/field";
import { Button } from "../button";
import { ErrorMessageAlert } from "../alerts";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void;
}

export const DespesaModalForm: React.FC<ModalProps> = ({ isOpen = false, onClose }) => {
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
                                        name: "", senha: "", confirmarSenha: "", nivelAcesso: ""
                                    }}
                                validationSchema={
                                    Yup.object(
                                        {
                                            descricao: Yup.string().required("Digite a descrição da despesa"),
                                            valor: Yup.string().required("Digite o valor da despesa"),
                                            data: Yup.string().required("Digite a data da despesa"),
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
                                            <TextField label="Descrição da Despesa" name="descricao" theme="lined" placeholder="Digite a descrição" type="text" />
                                            <ErrorMessageAlert name="descricao" component="div"/>
                                        </div>
                                        <div>
                                            <TextField label="Valor" name="valor" theme="lined" placeholder="R$ 0.00" type="number" />
                                            <ErrorMessageAlert name="valor" component="div"/>
                                        </div>
                                        <div>
                                            <TextField label="Data da Despesa" name="data" theme="lined" placeholder="Digite a data" type="password" />
                                            <ErrorMessageAlert name="data" component="div"/>
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