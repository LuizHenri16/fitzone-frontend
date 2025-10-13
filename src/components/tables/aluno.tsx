import { useState } from "react"
import { ActionButton } from "../button";
import { Spinner } from "../fitzone";
import { ClienteEditarModalForm } from "../forms";
import { ModalConfirm } from "../alerts";

interface Aluno {
    id: string,
    nome?: string,
    cpf?: string,
    telefone?: string,
    telefoneEmergencia?: string,
    status?: string
}

export const TableAlunos: React.FC = () => {

    const [loadingTable, setLoadingTable] = useState(false);
    const [alunos, setAlunos] = useState<Aluno[]>([{ id: "1", nome: "Luiz Henrique", cpf: "021.311.314-23", telefone: "71 983214-4144", telefoneEmergencia: "71 983214-4144", status: "Ativo" }])
    const [ClienteEditarModalIsOpen, setClienteEditarModalIsOpen] = useState(false);
    const [alunoDeletar, setAlunoDeletar] = useState<Aluno | null>(null)

     const deletarAluno = async (id: string) => {
        try {
            setLoadingTable(true);
            // Aqui terá a chamada de deletar o aluno
        } catch (error) {
            
        } finally {
            setLoadingTable(false);
            setAlunoDeletar(null);
        }
    }  

    return (
        <div >
            <div className="shadow-md rounded-2xl border border-zinc-300 overflow-x-auto w-full mx-auto p-5">
                <table className="w-full table-auto">
                    <thead className="text-center">
                        <tr>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">ID</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Nome</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">CPF</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Telefone</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">T.Emergência</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Status</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Ações</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">

                        {loadingTable ? (
                            <tr >
                                <td colSpan={7} className="text-center py-4"><Spinner /></td>
                            </tr>
                        )
                            : (alunos.length === 0 ? (
                                <tr >
                                    <td colSpan={7} className="text-center py-4">Nenhum aluno encontrado</td>
                                </tr>
                            ) :
                                alunos.map((aluno, index) => (
                                    <tr key={index} className="bg-white transition-colors cursor-pointer">
                                        <td className="font-semibold px-4 py-4 ">{aluno.id}</td>
                                        <td className="font-medium px-4 py-4 ">{aluno.nome}</td>
                                        <td className="font-medium px-4 py-4 ">{aluno.cpf}</td>
                                        <td className="font-medium px-4 py-4 ">{aluno.telefone}</td>
                                        <td className="font-medium px-4 py-4 ">{aluno.telefoneEmergencia}</td>
                                        <td className={`font-bold ${aluno.status === 'Ativo' && 'text-green-900'} ${aluno.status === 'Inativo' && 'text-red-900'}`}>{aluno.status}</td>
                                        <td className="w-full flex justify-center gap-3 items-center font-medium px-4 py-4 ">
                                            <ActionButton action="edit" onClick={() => setClienteEditarModalIsOpen(true)} />
                                            <ClienteEditarModalForm isOpen={ClienteEditarModalIsOpen} onClose={() => setClienteEditarModalIsOpen(false)} idAluno={aluno.id} />

                                            <ActionButton action="delete" onClick={() => setAlunoDeletar(aluno)} />
                                            <ModalConfirm isOpen={alunoDeletar !== null} title={`Deseja excluir o usuário ${aluno?.nome}`} message="Esta ação não pode ser desfeita." onConfirm={() => {
                                                if (alunoDeletar) {
                                                    deletarAluno(alunoDeletar.id);
                                                }
                                            }} onCancel={() => {
                                                setAlunoDeletar(null);
                                            }} />
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}