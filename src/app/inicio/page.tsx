'use client'
import { BirthdayStatus, LogoFlexRow, ShortcutButton, StatusCustomers, Template } from "@/components";
import { useRouter } from "next/navigation";

export default function InicioPage() {
    const router = useRouter();

    return <div>
        <Template pageName="Início">
            <div className="flex justify-center mb-6">
                <LogoFlexRow />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BirthdayStatus />
                <StatusCustomers />
            </div>

            <div className="grid grid-cols-2 smd:grid-cols-4 custom-grid mx-auto md:flex md:justify-around lg:justify-between gap-4 ">
                <ShortcutButton color="blue"
                    urlIcon="/icons/cadastraraluno-icon.svg"
                    name="Cadastrar Aluno"
                    altIcon="icone"
                    onClick={() => { router.push("/aluno/cadastro") }}
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

        </Template>
    </div>
}