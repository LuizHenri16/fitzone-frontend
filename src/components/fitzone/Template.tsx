import {Sidebar} from "@/components"


interface TemplateProps {
    pageName?: string
    children?: React.ReactNode
}

export const Template: React.FC<TemplateProps> = ({ children, pageName }) => {
    return <div className="px-2 flex flex-col items-center">
                <Sidebar pageName={pageName} />
                {children}
           </div>
}