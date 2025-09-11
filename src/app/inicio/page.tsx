'use client'
import { LogoFlexRow, ShortcutButton, Template } from "@/components";
import { useRouter } from "next/navigation";

export default function PageInicio() {

    const router = useRouter();

    return <div>
        <Template>
            <div className="mt-10 flex flex-col items-center w-[15rem]">
                <LogoFlexRow />
            </div>
            <div className="grid grid-cols-2 md:gap-5 gap-3 mt-10 lg:flex">
                <ShortcutButton color="blue" urlIcon="" name="Cadastrar Aluno" altIcon="icone" onClick={() => {router.push("/aluno/cadastro")}}/>
                <ShortcutButton color="orange" urlIcon="" name="Listar Cadastros" altIcon="icone" onClick={() => {router.push("/aluno")}}/>
                <ShortcutButton color="green" urlIcon="" name="Financeiro" altIcon="icone" onClick={() => {router.push("/financeiro")}}/>
                <ShortcutButton color="cyan" urlIcon="" name="Ficha de Treino" altIcon="icone" onClick={() => {router.push("/fichadetreino")}} />
            </div>
        </Template>
    </div>
}