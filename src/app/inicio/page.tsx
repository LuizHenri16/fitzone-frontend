'use client'
import { BirthdayStatus, ClienteModalForm, LogoFlexRow, ShortcutButton, StatusCustomers, Template } from "@/components";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InicioPage() {
    const router = useRouter();
    const [clienteCadastroModalIsOpen, setClienteCadastroModalIsOpen] = useState(false);

    return <div>
        <ClienteModalForm isOpen={clienteCadastroModalIsOpen} onClose={() => setClienteCadastroModalIsOpen(false)} />
        <Template onAbrirModal={() => setClienteCadastroModalIsOpen(true)} pagename="Início">
            <div className="flex flex-col justify-center items-center gap-5
            ">
                <div className="">
                    <LogoFlexRow />
                </div>

                <div className="w-full flex flex-col lg:flex-row gap-6 mt-5">
                    <BirthdayStatus />
                    <StatusCustomers />
                </div>

                <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 mt-5 ">
                    <ShortcutButton color="blue"
                        urlIcon="/icons/cadastraraluno-icon.svg"
                        name="Cadastrar Aluno"
                        altIcon="icone"
                        onClick={() => { setClienteCadastroModalIsOpen(true) }}
                    />
                    <ShortcutButton
                        color="orange"
                        urlIcon="/icons/listaraluno-icon.svg"
                        name="Listar Cadastros"
                        altIcon="icone"
                        onClick={() => { router.push("/aluno") }}
                    />
                    <ShortcutButton
                        color="green"
                        urlIcon="/icons/financeiro-icon.svg"
                        name="Financeiro"
                        altIcon="icone"
                        onClick={() => { router.push("/financeiro") }}
                    />
                    <ShortcutButton
                        color="cyan"
                        urlIcon="/icons/fichadetreino-icon.svg"
                        name="Ficha de Treino"
                        altIcon="icone"
                        onClick={() => { router.push("/fichadetreino") }}
                    />
                </div>
            </div>
        </Template>
    </div>
}