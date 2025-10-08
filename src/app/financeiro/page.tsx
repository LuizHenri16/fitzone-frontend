'use client'

import { Button, TableDespesas, TablePagamentos, Template } from "@/components";

export default function FinanceiroPage() {
    return (
        <Template pagename="Financeiro">
            <div>
                <h2 className="font-bold text-[#6B3E23]">Resumo Geral</h2>
            </div>

            <div className="flex flex-col gap-4 mt-10">
                <h2 className="font-bold text-[#6B3E23]">Pagamentos</h2>
                <TablePagamentos />
                <div className="w-full flex flex-col mt-6 gap-5 md:flex-row lg:justify-end">
                    <div className="w-full lg:w-[20rem]">
                        <Button name="Cadastrar Pagamento" theme="green" type="button" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 mt-10">
                <h2 className="font-bold text-[#6B3E23]">Despesas</h2>
                <TableDespesas />
                <div className="w-full flex flex-col mt-6 gap-5 md:flex-row lg:justify-end">
                    <div className="w-full lg:w-[20rem]">
                        <Button name="Cadastrar Despesa" theme="red" type="button" />
                    </div>
                </div>
            </div>
        </Template>
    )
}