'use client'

import { Button, ClienteModalForm, TableUsuarios, Template, UsuarioModalForm } from "@/components"
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function AdministradorPage() {

    const router = useRouter();
    const [usuarioCadastroModalIsOpen, setUsuarioCadastroModalIsOpen] = useState(false);
    const [clienteCadastroModalIsOpen, setClienteCadastroModalIsOpen] = useState(false);

    return (
        <Template pagename="Administrador" onAbrirModal={() => setClienteCadastroModalIsOpen(true)}>
            <TableUsuarios />
            <div className="w-full flex flex-col mt-6 gap-5 md:flex-row lg:justify-end">
                <div className="w-full lg:w-[20rem]">
                    <Button name="Cadastrar Usuário" theme="brown" type="button" onClick={() => setUsuarioCadastroModalIsOpen(true)} />
                    <UsuarioModalForm isOpen={usuarioCadastroModalIsOpen} onClose={() => setUsuarioCadastroModalIsOpen(false)} />
                    <ClienteModalForm isOpen={clienteCadastroModalIsOpen} onClose={() => setClienteCadastroModalIsOpen(false)} />
                </div>

                <div className="w-full lg:w-[20rem]">
                    <Button name="Voltar" theme="beige" type="button" onClick={()=> router.push("/inicio")} />
                </div>
            </div>
        </Template>
    )
}