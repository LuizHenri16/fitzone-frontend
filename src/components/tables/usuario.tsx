'use client'

import { ActionButton, Spinner } from "@/components";
import { useState } from "react";

interface Usuario {
    id: string,
    nome: string,
    nivelAcesso: string,
}

export const TableUsuarios: React.FC = () => {
    const [loadingTable, setLoadingTable] = useState(false);
    const [usuarios, setUsuarios] = useState<Usuario[]>([{ id: "1", nome: "Luiz Henrique", nivelAcesso: "Total" }])

    return (
        <div >
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
                            <tr >
                                <td colSpan={7} className="text-center py-4"><Spinner /></td>
                            </tr>
                        )
                            : (usuarios.length === 0 ? (
                                <tr >
                                    <td colSpan={7} className="text-center py-4">Nenhum aluno encontrado</td>
                                </tr>
                            ) :
                                usuarios.map((usuario, index) => (
                                    <tr key={index} className="bg-white transition-colors cursor-pointer">
                                        <td className="font-semibold px-4 py-4 ">{usuario.id}</td>
                                        <td className="font-medium px-4 py-4 ">{usuario.nome}</td>
                                        <td className="font-medium px-4 py-4 ">{usuario.nivelAcesso}</td>
                                        <td className="w-full flex justify-center gap-3 items-center font-medium px-4 py-4 ">
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