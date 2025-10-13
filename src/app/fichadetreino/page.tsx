'use client'

import { Button, ClienteModalForm, Template } from "@/components";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FichaDeTreinoPage() {

    const router = useRouter();
    const [clienteCadastroModalIsOpen, setClienteCadastroModalIsOpen] = useState(false);


    const [ficha, setFicha] = useState("");

    const setFichaHandler = (event: any) => {
        setFicha(event.target.value);
    }

    const imprimirFichaHandler = () => {
        const printWindow = window.open('', '', 'width=800,height=600');

        printWindow?.document.writeln(`
            <html>
                <head>
                    <title>Ficha de Treino</title>
                    <style>
                        h2 { color: #6b3e23; font-weight: bold; text-align: center; }
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        pre { white-space: pre-wrap; word-wrap: break-word; text-align: left; font-size: 18px; }
                    </style>
                </head>
                <body>
                    <h2>Ficha de Treino</h2>
                    <pre>${ficha}</pre>
                </body>
            </html>
        `)

        printWindow?.document.close()
        printWindow?.focus()
        printWindow?.print()
    }

    return (
        <Template pagename="Ficha de Treino" onAbrirModal={() => setClienteCadastroModalIsOpen(true)}>
            <ClienteModalForm isOpen={clienteCadastroModalIsOpen} onClose={() => setClienteCadastroModalIsOpen(false)} />
            <div>
                <div>
                    <h2 className="text-[#6b3e23] font-bold text-lg px-2">Digite a ficha de treino abaixo:</h2>
                </div>
                <div className="mt-5">
                    <textarea onChange={setFichaHandler} className="w-full shadow-md bg-white px-5 py-3 text-[#6B3E23] border-2 font-medium outline-none rounded-2xl" name=""></textarea>
                </div>
                <div className="w-full flex flex-col mt-5 gap-3 md:flex-row lg:justify-end">
                    <div className="w-full lg:w-[20rem]">
                        <Button name="Imprimir ficha de treino" theme="brown" onClick={imprimirFichaHandler} />
                    </div>
                    <div className="w-full lg:w-[20rem]">
                        <Button name="Voltar" theme="beige" onClick={() => router.push("/inicio")} />
                    </div>
                </div>
            </div>
        </Template>
    )
}