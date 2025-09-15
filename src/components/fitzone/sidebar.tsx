import { useState } from "react"
import { Button, SidebarButton } from "@/components"
import { useRouter } from "next/navigation"

interface SidebarProps {
    pageName?: string,
}

export const Sidebar: React.FC<SidebarProps> = ({ pageName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    return (
        <div className="w-full py-2">

            <nav className="flex justify-between text-green-900">
                <button
                    onClick={() => setIsOpen(true)}
                    className="hover:opacity-80 cursor-pointer">
                    <img src="/icons/menu-button.svg" alt="enu-button" />
                </button>
                <h1 className="text-xl font-semibold">{pageName}</h1>
            </nav>

            {/* Tela cheia com botões */}
            {isOpen && (
                <div className="fixed inset-0 bg-[#F3F3F3] bg-opacity-95 flex flex-col justify-between items-center z-50 px-5 py-5">
                    <div>
                        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white text-2xl">
                            ✕
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-5">
                        <SidebarButton name="início" onClick={() => { router.push("/inicio") }} urlIcon="/icons/inicio-icon.svg" altIcon="Sidebarbutton icone" />
                        <SidebarButton name="Cadastrar Aluno" onClick={() => { router.push("/aluno/cadastro") }} urlIcon="/icons/cadastraraluno-icon.svg" altIcon="Sidebarbutton icone" />
                        <SidebarButton name="Lista de Alunos" onClick={() => { router.push("/aluno") }} urlIcon="/icons/listaraluno-icon.svg" altIcon="Sidebarbutton icone" />
                        <SidebarButton name="Financeiro" onClick={() => { router.push("/financeiro") }} urlIcon="/icons/financeiro-icon.svg" altIcon="Sidebarbutton icone" />
                        <SidebarButton name="Ficha de Treino" onClick={() => { router.push("/fichadetreino") }} urlIcon="/icons/fichadetreino-icon.svg" altIcon="Sidebarbutton icone" />
                        <SidebarButton name="Administrador" onClick={() => { router.push("/administrador") }} urlIcon="/icons/administrador-icon.svg" altIcon="Sidebarbutton icone" />
                    </div>

                    <Button name="Sair" theme="red" onClick={() => {router.push("/login")}}/>
                </div>
            )}
        </div>
    )
}