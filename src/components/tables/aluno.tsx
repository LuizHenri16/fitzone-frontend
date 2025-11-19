import { useState, useEffect } from "react";
import { ActionButton } from "../button";
import { Spinner } from "../fitzone";
import { ClienteEditarModalForm } from "../forms";
import { MessageAlertModal, ModalConfirm } from "../alerts";
import api from "@/services/api";

interface User {
    id: number,
    username: string,
    access: string
}

interface Aluno {
    id: string;
    name: string;
    status: string;
}

interface Pageable {
    pageNumber: number;
    pageSize: number;
}

interface AlunosPage {
    content: Aluno[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
}

const initialPageData: AlunosPage = {
    content: [],
    pageable: { pageNumber: 0, pageSize: 10 },
    last: true,
    totalPages: 0,
    totalElements: 0,
    size: 10,
    number: 0,
    first: true,
    numberOfElements: 0,
};

export const TableAlunos: React.FC = () => {
    const [loadingTable, setLoadingTable] = useState(false);
    const [pageData, setPageData] = useState<AlunosPage>(initialPageData);
    const [currentPage, setCurrentPage] = useState(0);

    const [successMessage, setSuccessMessage] = useState("");
    const [successMessageModalIsOpen, setSuccessMessageModalIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageModalIsOpen, setErrorMessageModalIsOpen] = useState(false);

    const [clienteEditarModalIsOpen, setClienteEditarModalIsOpen] = useState(false);
    const [alunoSelecionadoParaEdicao, setAlunoSelecionadoParaEdicao] = useState<Aluno | null>(null);
    const [alunoDeletar, setAlunoDeletar] = useState<Aluno | null>(null);

    const [user, setUser] = useState<User>({} as User);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    const fetchAlunos = async (page: number) => {
        setLoadingTable(true);
        const pageSize = 10;

        try {
            const response = await api.get("/customer", {
                params: { page, size: pageSize },
            });

            const backendData: AlunosPage = response.data;
            setPageData(backendData);
            setCurrentPage(backendData.number);

        } catch (error) {
            setErrorMessage("Erro ao buscar alunos:");
            setErrorMessageModalIsOpen(true);
        } finally {
            setLoadingTable(false);
        }
    };

    useEffect(() => {
        fetchAlunos(0);
    }, []);

    const deletarAluno = async (id: string) => {

        api.delete(`/customer/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setSuccessMessage("Aluno deletado com sucesso");
                    setSuccessMessageModalIsOpen(true);
                    setAlunoDeletar(null);
                    fetchAlunos(currentPage);
                }
            })
            .catch(error => {
                setErrorMessage("Ocorreu um erro ao deletar o aluno");
                setErrorMessageModalIsOpen(true);
            })
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < pageData.totalPages) {
            fetchAlunos(newPage);
        }
    };

    const alunos = pageData.content;

    return (
        <div>
            <div className="shadow-md rounded-2xl border border-zinc-300 overflow-x-auto w-full mx-auto p-5">
                <table className="w-full table-auto">
                    <thead className="text-center">
                        <tr>
                            <th className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">ID</th>
                            <th className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Nome</th>
                            <th className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Status</th>
                            <th className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {loadingTable ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4"><Spinner /></td>
                            </tr>
                        ) : alunos.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4">Nenhum aluno encontrado</td>
                            </tr>
                        ) : (
                            alunos.map((aluno) => (
                                <tr key={aluno.id} className="bg-white transition-colors cursor-pointer">
                                    <td className="font-semibold px-4 py-4">{aluno.id}</td>
                                    <td className="font-medium px-4 py-4">{aluno.name}</td>
                                    <td className={`font-bold ${aluno.status === 'Ativo' ? 'text-green-900' : 'text-red-900'}`}>{aluno.status}</td>
                                    <td className="w-full flex justify-center gap-3 items-center font-medium px-4 py-4">
                                        {user.access === "Total" && <>
                                            <ActionButton action="edit" onClick={() => {
                                                setAlunoSelecionadoParaEdicao(aluno);
                                                setClienteEditarModalIsOpen(true);
                                            }} />
                                            <ActionButton action="delete" onClick={() => setAlunoDeletar(aluno)} />
                                        </>}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {clienteEditarModalIsOpen && alunoSelecionadoParaEdicao && (
                <ClienteEditarModalForm
                    isOpen={true}
                    onClose={() => setClienteEditarModalIsOpen(false)}
                    idAluno={alunoSelecionadoParaEdicao.id}
                />
            )}

            {alunoDeletar && (
                <ModalConfirm
                    isOpen={true}
                    title={`Deseja excluir o usuário ${alunoDeletar.name}`}
                    message="Esta ação não pode ser desfeita."
                    onConfirm={() => deletarAluno(alunoDeletar.id)}
                    onCancel={() => setAlunoDeletar(null)}
                />
            )}

            <div className="flex justify-between items-center mt-4 p-2">
                <span className="text-sm text-gray-700">
                    Mostrando {(pageData.number * pageData.size) + 1} a {((pageData.number * pageData.size) + pageData.numberOfElements)} de {pageData.totalElements} resultados.
                </span>

                {pageData.totalPages > 1 && (
                    <div className="flex space-x-2">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={pageData.first || loadingTable} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors 
              ${pageData.first || loadingTable ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#6B3E23] text-white hover:bg-opacity-90'}`}>Anterior</button>

                        <span className="px-4 py-2 text-sm font-semibold text-[#6B3E23] border border-gray-300 rounded-lg">
                            {pageData.number + 1} / {pageData.totalPages}
                        </span>

                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={pageData.last || loadingTable} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors 
              ${pageData.last || loadingTable ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#6B3E23] text-white hover:bg-opacity-90'}`}>Próximo</button>
                    </div>
                )}
            </div>

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
};
