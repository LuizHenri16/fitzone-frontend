import { useState } from "react";
import { Spinner } from "../fitzone";

interface Despesas {
    id: string,
    descricao: string,
    valor:number,
    data:string
}

export const TableDespesas: React.FC = () => {

    const [loadingTable, setLoadingTable] = useState(false);
    const [despesas, setDespesas] = useState<Despesas[]>([{ id: "1", descricao: "Banco para supino", valor: 150.00, data: "10/5/2025"}])

    return (
        <div >
            <div className="shadow-md rounded-2xl border border-zinc-300 overflow-x-auto w-full mx-auto p-5">
                <table className="w-full table-auto">
                    <thead className="text-center">
                        <tr>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">ID</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Descrição</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Valor</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Data</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">

                        {loadingTable ? (
                            <tr >
                                <td colSpan={4} className="text-center py-4"><Spinner/></td>
                            </tr>
                        )
                            : (despesas.length === 0 ? (
                                <tr >
                                    <td colSpan={4} className="text-center py-4">Nenhuma despesa encontrada</td>
                                </tr>
                            ) :
                                despesas.map((despesa, index) => (
                                    <tr key={index} className="bg-white transition-colors cursor-pointer">
                                        <td className="font-semibold px-4 py-4 ">{despesa.id}</td>
                                        <td className="font-medium px-4 py-4 ">{despesa.descricao}</td>
                                        <td className="font-medium px-4 py-4 ">R$ {despesa.valor}</td>
                                        <td className="font-medium px-4 py-4 ">{despesa.data}</td>
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