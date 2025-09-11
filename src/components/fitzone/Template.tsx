import {Sidebar} from "@/components"

interface TemplateProps {
    children?: React.ReactNode
}

export const Template: React.FC<TemplateProps> = ({ children }) => {
    return <div className="px-2 flex flex-col items-center">
                <Sidebar />
                {children}
           </div>
}