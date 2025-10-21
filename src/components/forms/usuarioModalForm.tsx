import { Formik, Form } from "formik";
import * as Yup from "yup"
import { SelectField, TextField } from "../formikcustom/field";
import { Button } from "../button";
import { ErrorMessageAlert } from "../alerts";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void;
}

export const UsuarioModalForm: React.FC<ModalProps> = ({ isOpen = false, onClose }) => {
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
                                        nome: "", senha: "", confirmaSenha: "", nivelAcesso: ""
                                    }}
                                validationSchema={
                                    Yup.object(
                                        {
                                            nome: Yup.string().required("Campo de nome obrigatório"),
                                            senha: Yup.string().required("Campo de senha obrigatório"),
                                            confirmaSenha: Yup.string().oneOf([Yup.ref('senha'), undefined], 'As senhas devem corresponder').required('Confirmação de senha é obrigatória'),
                                            nivelAcesso: Yup.string().oneOf(["Total", "Parcial"], "Selecione um nível de acesso")
                                        }
                                    )}
                                onSubmit={
                                    async (values, { setSubmitting, setErrors, resetForm }) => {
                                        setSubmitting(true);
                                        try {

                                            resetForm()
                                        } catch (error: any) {

                                        } finally {

                                        }
                                    }}>
                                {({ isSubmitting }) => (
                                    <Form className="">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <TextField label="Nome de Usuário" name="nome" theme="lined" placeholder="Digite o nome do aluno" type="text" />
                                                <ErrorMessageAlert name="nome" component='div' />
                                            </div>
                                            <div>
                                                <TextField label="Senha" name="senha" theme="lined" placeholder="Digite o nome do aluno" type="password" />
                                                <ErrorMessageAlert name="senha" component='div' />
                                            </div>
                                            <div>
                                                <TextField label="Confirmar Senha" name="confirmaSenha" theme="lined" placeholder="Digite o nome do aluno" type="password" />
                                                <ErrorMessageAlert name="confirmaSenha" component='div' />
                                            </div>
                                            <div className="">
                                                <SelectField theme="lined" name="nivelAcesso" htmlFor="nivelAcesso" label="Nível de Acesso" options={["Selecionar", "Total", "Parcial"]} />
                                                <ErrorMessageAlert name="nivelAcesso" component='div' />
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
        </div>
    )
}