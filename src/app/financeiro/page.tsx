'use client'

import { Button, DespesaModalForm, PagamentoModalForm, TableDespesas, TablePagamentos, Template, TotalDespesasBox, TotalPagamentosBox, TotalReceitaBox } from "@/components";
import { useState } from "react";

export default function FinanceiroPage() {
    const [pagamentoCadastroModalIsOpen, setPagamentoCadastroModalIsOpen] = useState(false);
    const [despesaCadastroModalIsOpen, setDespesaCadastroModalIsOpen] = useState(false);

    return (
        <Template pagename="Financeiro">
            <div className="flex flex-col gap-4">
                <h2 className="font-bold text-[#6B3E23]">Resumo Geral</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <TotalReceitaBox />
                    <TotalPagamentosBox />
                    <TotalDespesasBox />
                </div>
            </div>

            <div className="flex flex-col gap-4 mt-10">
                <h2 className="font-bold text-[#6B3E23]">Pagamentos</h2>
                <TablePagamentos />
                <div className="w-full flex flex-col mt-6 gap-5 md:flex-row lg:justify-end">
                    <div className="w-full lg:w-[20rem]">
                        <Button name="Cadastrar Pagamento" theme="green" type="button" onClick={() => { setPagamentoCadastroModalIsOpen(true) }} />
                        <PagamentoModalForm isOpen={pagamentoCadastroModalIsOpen} onClose={() => setPagamentoCadastroModalIsOpen(false)} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 mt-10">
                <h2 className="font-bold text-[#6B3E23]">Despesas</h2>
                <TableDespesas />
                <div className="w-full flex flex-col mt-6 gap-5 md:flex-row lg:justify-end">
                    <div className="w-full lg:w-[20rem]">
                        <Button name="Cadastrar Despesa" theme="red" type="button" onClick={() => { setDespesaCadastroModalIsOpen(true) }} />
                        <DespesaModalForm isOpen={despesaCadastroModalIsOpen} onClose={() => setDespesaCadastroModalIsOpen(false)} />
                    </div>
                </div>
            </div>
        </Template>
    )
}