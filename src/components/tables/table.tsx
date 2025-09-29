import { useState } from "react"

interface Aluno {
    id?: string,
    nome?: string,
    telefone?: string,
    telefoneEmergencia?: string,
    status?: string
}

export const TableAlunos: React.FC = () => {

    const [loadingTable, setLoadingTable] = useState(false);
    const [alunos, setAlunos] = useState<Aluno[]>([])

    return (
        <div>
            {
                loadingTable ? (
                    <div></div>
                ) : (<>
                    <div className="shadow-md rounded-2xl border border-zinc-300 overflow-x-auto w-full mx-auto p-5">
                        <table className="w-full table-auto">
                            <thead className="text-center">
                                <tr>
                                    <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">ID</th>
                                    <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Nome</th>
                                    <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">CPF</th>
                                    <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Telefone</th>
                                    <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Status</th>
                                    <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Ações</th>
                                </tr>
                            </thead>

                            <tbody className="text-center">
                                {alunos.length === 0 ? (
                                    <tr >
                                        <td colSpan={6} className="text-center py-4">Nenhum aluno encontrado</td>
                                    </tr>
                                ) :
                                    alunos.map((aluno, index) => (
                                        <tr key={index} className="bg-white hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors cursor-pointer">
                                            <td className="font-semibold px-4 py-4 border-b-1 border-gray-300">{aluno.id}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{aluno.nome}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{aluno.telefone}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{aluno.telefoneEmergencia}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{aluno.status}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">
                                                <button className="w-4 hover:opacity-70 transition-opacity cursor-pointer" onClick={() => console.log()}>
                                                    <img src={"./icons/remove-icon.svg"} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </>
                )}
        </div>
    )
}