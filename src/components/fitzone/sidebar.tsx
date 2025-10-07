import { useRouter } from "next/navigation";
import { Button, SidebarButton } from "../button";
import { useState } from "react";
import { ClienteModalForm } from "../forms";

interface SidebarProps {
  onAbrirModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({onAbrirModal}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [clienteCadastroModalIsOpen, setClienteCadastroModalIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar fixa em telas grandes */}
      <div className="hidden lg:items-center lg:flex lg:flex-col lg:w-64 lg:h-screen lg:py-6 lg:px-4 border-r-3 border-r-[#F3F3F3]">
        <div className="w-full bg-white shadow-md rounded-2xl p-2">
          <p className="font-bold text-lg text-[#6B3E23]">Usuário: </p>
        </div>
        <div className="flex flex-col gap-5 mt-auto">
          <SidebarButton name="Início" onClick={() => router.push("/inicio")} urlIcon="/icons/inicio-icon.svg" altIcon="Sidebarbutton icone" />
          <SidebarButton name="Cadastrar Aluno" onAbrirModal={onAbrirModal} urlIcon="/icons/cadastraraluno-icon.svg" altIcon="Sidebarbutton icone" />
          <SidebarButton name="Lista de Alunos" onClick={() => router.push("/aluno")} urlIcon="/icons/listaraluno-icon.svg" altIcon="Sidebarbutton icone" />
          <SidebarButton name="Financeiro" onClick={() => router.push("/financeiro")} urlIcon="/icons/financeiro-icon.svg" altIcon="Sidebarbutton icone" />
          <SidebarButton name="Ficha de Treino" onClick={() => router.push("/fichadetreino")} urlIcon="/icons/fichadetreino-icon.svg" altIcon="Sidebarbutton icone" />
          <SidebarButton name="Administrador" onClick={() => router.push("/administrador")} urlIcon="/icons/administrador-icon.svg" altIcon="Sidebarbutton icone" />
        </div>
        <div className="w-full mt-auto">
          <Button name="Sair" theme="red" onClick={() => router.push("/login")} />
        </div>
      </div>

      {/* Menu mobile */}
      <div className="lg:hidden w-full py-2">
        <nav className="flex justify-between text-green-900 px-4">
          <button onClick={() => setIsOpen(true)} className="hover:opacity-80 cursor-pointer">
            <img src="/icons/menu-button.svg" alt="menu-button" />
          </button>
        </nav>

        {isOpen && (
          <div className="fixed inset-0 bg-[#F3F3F3] bg-opacity-95 flex flex-col items-center justify-between z-50 px-5 py-5">

            <div className="w-full max-w-md">
              <div className="flex justify-between items-center gap-6">
                <p className="bg-white p-3 rounded-2xl font-bold text-lg text-[#6B3E23] whitespace-nowrap">Usuário:</p>
                <button onClick={() => {setIsOpen(false), setClienteCadastroModalIsOpen(false)} } className="text-3xl hover:text-[#c5c5c5] cursor-pointer">✕</button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-5 mt-10 w-full max-w-md">
              <SidebarButton name="Início" onClick={() => router.push("/inicio")} urlIcon="/icons/inicio-icon.svg" altIcon="Sidebarbutton icone" />
              <SidebarButton name="Cadastrar Aluno" onClick={onAbrirModal} urlIcon="/icons/cadastraraluno-icon.svg" altIcon="Sidebarbutton icone" />
              <SidebarButton name="Lista de Alunos" onClick={() => router.push("/aluno")} urlIcon="/icons/listaraluno-icon.svg" altIcon="Sidebarbutton icone" />
              <SidebarButton name="Financeiro" onClick={() => router.push("/financeiro")} urlIcon="/icons/financeiro-icon.svg" altIcon="Sidebarbutton icone" />
              <SidebarButton name="Ficha de Treino" onClick={() => router.push("/fichadetreino")} urlIcon="/icons/fichadetreino-icon.svg" altIcon="Sidebarbutton icone" />
              <SidebarButton name="Administrador" onClick={() => router.push("/administrador")} urlIcon="/icons/administrador-icon.svg" altIcon="Sidebarbutton icone" />
            </div>

            <div className="w-full flex justify-center mb-5">
              <div className="max-w-md w-full">
                <Button name="Sair" theme="red" onClick={() => router.push("/login")} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
