'use client'
import { BirthdayStatus, LogoFlexRow, ShortcutButton, StatusCustomers, Template } from "@/components";
import { useRouter } from "next/navigation";

export default function InicioPage() {
    const router = useRouter();

    return <div>
        <Template>
            <div className="flex flex-col ">
                <h1 className="text-xl font-semibold self-end">Início</h1>
                <div className="flex justify-center mb-6">
                    <LogoFlexRow />
                </div>

                <div className="flex flex-col gap-10 min-[640px]:flex-row mx-auto">
                    <BirthdayStatus />
                    <StatusCustomers />
                </div>

                <div className="grid grid-cols-2 min-[640px]:grid-cols-4 custom-grid mx-auto md:flex md:justify-around lg:justify-between gap-4 mt-5 ">
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
            </div>
        </Template>
    </div>
}