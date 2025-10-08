import { useState } from "react";
import { Spinner } from "../fitzone";

interface Pagamento {
    id: string,
    nomePagador: string,
    valor:number,
    emailPagador:string
}

export const TablePagamentos: React.FC = () => {

    const [loadingTable, setLoadingTable] = useState(false);
    const [pagamentos, setPagamentos] = useState<Pagamento[]>([{ id: "1", nomePagador: "Luiz Henrique", valor: 150.00, emailPagador: "luiz@gmail.com"}])

    return (
        <div >
            <div className="shadow-md rounded-2xl border border-zinc-300 overflow-x-auto w-full mx-auto p-5">
                <table className="w-full table-auto">
                    <thead className="text-center">
                        <tr>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">ID</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Aluno</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Valor</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Email Pagador</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">

                        {loadingTable ? (
                            <tr >
                                <td colSpan={4} className="text-center py-4"><Spinner /></td>
                            </tr>
                        )
                            : (pagamentos.length === 0 ? (
                                <tr >
                                    <td colSpan={4} className="text-center py-4">Nenhum pagamento encontrado</td>
                                </tr>
                            ) :
                                pagamentos.map((pagamento, index) => (
                                    <tr key={index} className="bg-white transition-colors cursor-pointer">
                                        <td className="font-semibold px-4 py-4 ">{pagamento.id}</td>
                                        <td className="font-medium px-4 py-4 ">{pagamento.nomePagador}</td>
                                        <td className="font-medium px-4 py-4 ">R$ {pagamento.valor}</td>
                                        <td className="font-medium px-4 py-4 ">{pagamento.emailPagador}</td>
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