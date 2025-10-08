import { Formik, Form } from "formik";
import * as Yup from "yup"
import { SelectField, TextField } from "../formikcustom/field";
import { Button } from "../button";

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
                                <h2 className="font-bold text-3xl text-[#116343]">Cadastrar Aluno</h2>   
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
                                            name: Yup.string().required("Campo de nome obrigatório"),
                                            senha: Yup.string().required("Campo de senha obrigatório"),
                                            confirmarSenha: Yup.string().oneOf([Yup.ref('senha'), undefined], 'As senhas devem corresponder').required('Confirmação de senha é obrigatória'),
                                            nivelAcesso: Yup.string().oneOf(["Total", "Parcial"], "Selecione um nível de acesso")
                                        }
                                    )}
                                onSubmit={
                                    async (values, { setSubmitting , resetForm }) => {
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
                                            <TextField label="Nome de Usuário" name="name" theme="lined" placeholder="Digite o nome do aluno" type="text" />
                                        </div>
                                        <div>
                                            <TextField label="Senha" name="senha" theme="lined" placeholder="Digite o nome do aluno" type="password" />
                                        </div>
                                        <div>
                                            <TextField label="Confirmar Senha" name="confirmSenha" theme="lined" placeholder="Digite o nome do aluno" type="password" />
                                        </div>
                                        <div className="">
                                            <SelectField theme="lined" name="matricula" htmlFor="matricula" label="Nível de Acesso" options={[ "Selecionar","Total", "Parcial"]} />
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