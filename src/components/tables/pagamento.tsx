import { useState, useEffect } from "react";
import { Spinner } from "../fitzone";
import api from "@/services/api";

interface Pagamento {
    id: number,
    lastPayment: string
    customer: {
        name: string,
        email: string,
        license: {
            license: string,
            price: number,
            id: number
        },

    }
}

interface PageableInfo {
    pageNumber: number;
    pageSize: number;
}

interface PagamentosPage {
    content: Pagamento[];
    pageable: PageableInfo;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
}

const initialPageData: PagamentosPage = {
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

export const TablePagamentos: React.FC = () => {
    const [loadingTable, setLoadingTable] = useState(false);
    const [pageData, setPageData] = useState<PagamentosPage>(initialPageData);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchPagamentos = async (page: number) => {
        setLoadingTable(true);
        const pageSize = 10;

        try {
            const response = await api.get("/finance/payment", {
                params: { page, size: pageSize },
            });

            const backendData: PagamentosPage = response.data;
            setPageData(backendData);
            setCurrentPage(backendData.number);
        } catch (error) {
            setPageData(initialPageData);
        } finally {
            setLoadingTable(false);
        }
    };

    useEffect(() => {
        fetchPagamentos(0);
    }, []);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < pageData.totalPages) {
            fetchPagamentos(newPage);
        }
    };

    const pagamentos = pageData.content;

    return (
        <div>
            <div className="shadow-md rounded-2xl border border-zinc-300 overflow-x-auto w-full mx-auto p-5">
                <table className="w-full table-auto">
                    <thead className="text-center">
                        <tr>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">ID</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Aluno</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Valor</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Ultimo Pagamento</th>
                            <th scope="col" className="font-medium text-[#6B3E23] px-4 py-2 border-b-1 border-gray-300">Email Pagador</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {loadingTable ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4"><Spinner /></td>
                            </tr>
                        ) : pagamentos.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4">Nenhum pagamento encontrado</td>
                            </tr>
                        ) : (
                            pagamentos.map((pagamento) => (
                                <tr key={pagamento.id} className="bg-white transition-colors cursor-pointer">
                                    <td className="font-semibold px-4 py-4 ">{pagamento.id}</td>
                                    <td className="font-medium px-4 py-4 ">{pagamento.customer.name}</td>
                                    <td className="font-medium px-4 py-4 ">
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(pagamento.customer.license.price)}
                                    </td>
                                    <td className="font-medium px-4 py-4">
                                        {
                                        new Date(pagamento.lastPayment + 'T12:00:00').toLocaleDateString('pt-BR', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        })}
                                    </td>
                                    <td className="font-medium px-4 py-4 ">{pagamento.customer.email}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4 p-2">
                <span className="text-sm text-gray-700">
                    Mostrando {(pageData.number * pageData.size) + 1} a {((pageData.number * pageData.size) + pageData.numberOfElements)} de {pageData.totalElements} resultados.
                </span>

                {pageData.totalPages > 1 && (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={pageData.first || loadingTable}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors 
                            ${pageData.first || loadingTable ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#6B3E23] text-white hover:bg-opacity-90'}`}
                        >
                            Anterior
                        </button>

                        <span className="px-4 py-2 text-sm font-semibold text-[#6B3E23] border border-gray-300 rounded-lg">
                            {pageData.number + 1} / {pageData.totalPages}
                        </span>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={pageData.last || loadingTable}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors 
                            ${pageData.last || loadingTable ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#6B3E23] text-white hover:bg-opacity-90'}`}
                        >
                            Próximo
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};