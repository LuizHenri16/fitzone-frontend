'use client'

import { ActionButton, ModalConfirm, Spinner, UsuarioEditarModalForm, MessageAlertModal } from "@/components";
import api from "@/services/api";
import { useEffect, useState } from "react";

interface Usuario {
    id: string;
    username: string;
    access: string;
}

export const TableUsuarios: React.FC = () => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [usuarioSelecionadoParaEdicao, setUsuarioSelecionadoParaEdicao] = useState<Usuario | null>(null);
    const [usuarioParaDeletar, setUsuarioParaDeletar] = useState<Usuario | null>(null);

    const [successMessage, setSuccessMessage] = useState("");
    const [successMessageModalIsOpen, setSuccessMessageModalIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageModalIsOpen, setErrorMessageModalIsOpen] = useState(false);

    const fetchUsuarios = async () => {
        setLoadingTable(true);
        try {
            const response = await api.get("/user");
            setUsuarios(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            setErrorMessage("Erro ao carregar a lista de usuários.");
            setErrorMessageModalIsOpen(true);
        } finally {
            setLoadingTable(false);
        }
    }

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const deletarUsuario = async (id: string) => {
        setUsuarioParaDeletar(null);
        setLoadingTable(true);

        api.delete(`/user/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setSuccessMessage("Usuário deletado com sucesso.");
                    setSuccessMessageModalIsOpen(true);
                    fetchUsuarios();
                }
            })
            .catch(error => {
                setErrorMessage("Ocorreu um erro ao deletar o usuário");
                setErrorMessageModalIsOpen(true);
            })




    };
    return (
        <div>
            <div className="shadow-md rounded-2xl border border-zinc-300 overflow-x-auto w-full mx-auto p-5">
                <table className="w-full table-auto">
                    <thead className="text-center">
                        <tr>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">ID</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Nome</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Nível de Acesso</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Ações</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {loadingTable ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4"><Spinner /></td>
                            </tr>
                        ) : usuarios.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4">Nenhum usuário encontrado</td>
                            </tr>
                        ) : (
                            usuarios.map((usuario) => (
                                <tr key={usuario.id} className="bg-white transition-colors cursor-pointer">
                                    <td className="font-semibold px-4 py-4 ">{usuario.id}</td>
                                    <td className="font-medium px-4 py-4 ">{usuario.username}</td>
                                    <td className="font-medium px-4 py-4 ">{usuario.access}</td>
                                    <td className="w-full flex justify-center gap-3 items-center font-medium px-4 py-4 ">
                                        <ActionButton
                                            action="edit"
                                            onClick={() => setUsuarioSelecionadoParaEdicao(usuario)}
                                        />
                                        <ActionButton
                                            action="delete"
                                            onClick={() => setUsuarioParaDeletar(usuario)}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {usuarioSelecionadoParaEdicao && (
                <UsuarioEditarModalForm
                    isOpen={true}
                    onClose={() => setUsuarioSelecionadoParaEdicao(null)}
                    usuario={usuarioSelecionadoParaEdicao}
                    onSuccess={() => fetchUsuarios()}
                />
            )}

            {usuarioParaDeletar && (
                <ModalConfirm
                    isOpen={true}
                    title={`Deseja excluir o usuário ${usuarioParaDeletar.username}?`}
                    message="Esta ação não pode ser desfeita."
                    onConfirm={() => deletarUsuario(usuarioParaDeletar.id)}
                    onCancel={() => setUsuarioParaDeletar(null)}
                />
            )}


            {successMessageModalIsOpen && (
                <MessageAlertModal
                    title="Sucesso"
                    message={successMessage}
                    isOpen={true}
                    onCancel={() => setSuccessMessageModalIsOpen(false)}
                />
            )}

            {errorMessageModalIsOpen && (
                <MessageAlertModal
                    title="Erro"
                    message={errorMessage}
                    isOpen={true}
                    onCancel={() => setErrorMessageModalIsOpen(false)}
                />
            )}
        </div>
    );
}