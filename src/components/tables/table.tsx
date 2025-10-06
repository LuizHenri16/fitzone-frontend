import { useState } from "react"
import { ActionButton } from "../button";

interface Aluno {
    id?: string,
    nome?: string,
    cpf?: string,
    telefone?: string,
    telefoneEmergencia?: string,
    status?: string
}

export const TableAlunos: React.FC = () => {

    const [loadingTable, setLoadingTable] = useState(false);
    const [alunos, setAlunos] = useState<Aluno[]>([{ id: "1", nome: "Luiz", cpf: "021.311.314-23", telefone: "71 983214-4144", telefoneEmergencia: "71 983214-4144", status: "Ativo" }])

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
                                <td colSpan={7} className="text-center py-4">carregando dados</td>
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
                                        <td className="font-medium px-4 py-4 ">{aluno.status}</td>
                                        <td className="font-medium px-4 py-4 ">
                                            <ActionButton action="edit" onClick={console.log} />
                                            <ActionButton action="delete" onClick={console.log} />
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