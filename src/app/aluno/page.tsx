'use client'

import { TableAlunos, Template, Button } from "@/components";

export default function AlunosPage() {
    return <div>
        <Template pagename="Alunos">
            <TableAlunos /> 
            <div className="w-full flex flex-col mt-6 gap-5 md:flex-row lg:justify-end">
                <div className="w-full lg:w-[20rem]">
                    <Button name="Cadastrar Aluno" theme="brown" type="button" onClick={console.log}/>
                </div>
                <div className="w-full lg:w-[20rem]">
                    <Button name="Voltar" theme="beige" type="button" onClick={console.log}/>
                </div>
            </div>
        </Template>
    </div>
}