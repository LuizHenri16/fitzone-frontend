'use client'

import { TableAlunos, Template, Button, ClienteModalForm } from "@/components";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AlunosPage() {
    const router = useRouter();
    const [clienteCadastroModalIsOpen, setClienteCadastroModalIsOpen] = useState(false);

    return <div>
        <Template pagename="Alunos" onAbrirModal={() => setClienteCadastroModalIsOpen(true)}>
            <TableAlunos />
            <div className="w-full flex flex-col mt-6 gap-5 md:flex-row lg:justify-end">

                <div className="w-full lg:w-[20rem]">
                    <Button name="Cadastrar Aluno" theme="brown" type="button" onClick={() => setClienteCadastroModalIsOpen(true)} />
                    <ClienteModalForm isOpen={clienteCadastroModalIsOpen} onClose={() => setClienteCadastroModalIsOpen(false)} />
                </div>

                <div className="w-full lg:w-[20rem]">
                    <Button name="Voltar" theme="beige" type="button" onClick={() => router.push("/inicio")} />
                </div>
                
            </div>
        </Template>
    </div>
}