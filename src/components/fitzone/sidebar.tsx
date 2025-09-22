import { useRouter } from "next/navigation";
import { Button, SidebarButton } from "../button";
import { useState } from "react";

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Sidebar fixa em telas grandes */}
      <div className="hidden md:items-center md:flex md:flex-col md:w-64 md:h-screen md:py-6 md:px-4 border-r-3 border-r-[#F3F3F3]">
        <div className="flex flex-col gap-5">
          <SidebarButton name="Início" onClick={() => router.push("/inicio")} urlIcon="/icons/inicio-icon.svg" altIcon="Sidebarbutton icone" />
          <SidebarButton name="Cadastrar Aluno" onClick={() => router.push("/aluno/cadastro")} urlIcon="/icons/cadastraraluno-icon.svg" altIcon="Sidebarbutton icone" />
          <SidebarButton name="Lista de Alunos" onClick={() => router.push("/aluno")} urlIcon="/icons/listaraluno-icon.svg" altIcon="Sidebarbutton icone" />
          <SidebarButton name="Financeiro" onClick={() => router.push("/financeiro")} urlIcon="/icons/financeiro-icon.svg" altIcon="Sidebarbutton icone" />
          <SidebarButton name="Ficha de Treino" onClick={() => router.push("/fichadetreino")} urlIcon="/icons/fichadetreino-icon.svg" altIcon="Sidebarbutton icone" />
          <SidebarButton name="Administrador" onClick={() => router.push("/administrador")} urlIcon="/icons/administrador-icon.svg" altIcon="Sidebarbutton icone" />
        </div>
        <div className="mt-auto">
          <Button name="Sair" theme="red" onClick={() => router.push("/login")} />
        </div>
      </div>

      {/* Menu mobile */}
      <div className="md:hidden w-full py-2">
        <nav className="flex justify-between text-green-900 px-4">
          <button onClick={() => setIsOpen(true)} className="hover:opacity-80 cursor-pointer">
            <img src="/icons/menu-button.svg" alt="menu-button" />
          </button>
        </nav>

        {isOpen && (
          <div className="fixed inset-0 bg-[#F3F3F3] bg-opacity-95 flex flex-col justify-between items-center z-50 px-5 py-5">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-3xl hover:text-[#c5c5c5] cursor-pointer">
              ✕
            </button>

            <div className="flex flex-col items-center gap-5 mt-10">
              <SidebarButton name="Início" onClick={() => router.push("/inicio")} urlIcon="/icons/inicio-icon.svg" altIcon="Sidebarbutton icone" />
              <SidebarButton name="Cadastrar Aluno" onClick={() => router.push("/aluno/cadastro")} urlIcon="/icons/cadastraraluno-icon.svg" altIcon="Sidebarbutton icone" />
              <SidebarButton name="Lista de Alunos" onClick={() => router.push("/aluno")} urlIcon="/icons/listaraluno-icon.svg" altIcon="Sidebarbutton icone" />
              <SidebarButton name="Financeiro" onClick={() => router.push("/financeiro")} urlIcon="/icons/financeiro-icon.svg" altIcon="Sidebarbutton icone" />
              <SidebarButton name="Ficha de Treino" onClick={() => router.push("/fichadetreino")} urlIcon="/icons/fichadetreino-icon.svg" altIcon="Sidebarbutton icone" />
              <SidebarButton name="Administrador" onClick={() => router.push("/administrador")} urlIcon="/icons/administrador-icon.svg" altIcon="Sidebarbutton icone" />
            </div>

            <Button name="Sair" theme="red" onClick={() => router.push("/login")} />
          </div>
        )}
      </div>
    </>
  );
};
