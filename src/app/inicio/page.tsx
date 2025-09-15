'use client'
import { BirthdayStatus, LogoFlexRow, ShortcutButton, StatusCustomers, Template } from "@/components";
import { useRouter } from "next/navigation";

export default function InicioPage() {
    const router = useRouter();

    return <div>
        <Template pageName="Início">
            <div className="mt-15 flex flex-col items-center w-[15rem] lg:w-[30rem]">
                <LogoFlexRow />
            </div>

            <div className="mt-10 flex flex-col gap-8 lg:flex-row">
                <BirthdayStatus />
                <StatusCustomers />
            </div>

            <div className="grid grid-cols-2 md:gap-10 gap-6 mt-10 lg:flex">
                <ShortcutButton color="blue" urlIcon="/icons/cadastraraluno-icon.svg" name="Cadastrar Aluno" altIcon="icone" onClick={() => {router.push("/aluno/cadastro")}}/>
                <ShortcutButton color="orange" urlIcon="/icons/listaraluno-icon.svg" name="Listar Cadastros" altIcon="icone" onClick={() => {router.push("/aluno")}}/>
                <ShortcutButton color="green" urlIcon="/icons/financeiro-icon.svg" name="Financeiro" altIcon="icone" onClick={() => {router.push("/financeiro")}}/>
                <ShortcutButton color="cyan" urlIcon="/icons/fichadetreino-icon.svg" name="Ficha de Treino" altIcon="icone" onClick={() => {router.push("/fichadetreino")}} />
            </div>
        </Template>
    </div>
}