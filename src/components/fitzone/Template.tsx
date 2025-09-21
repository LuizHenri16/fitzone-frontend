import { Sidebar } from "@/components"


interface TemplateProps {
    children?: React.ReactNode
}

export const Template: React.FC<TemplateProps> = ({ children }) => {
    return <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>

    </div>
}