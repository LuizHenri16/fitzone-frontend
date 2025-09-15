import {Sidebar} from "@/components"


interface TemplateProps {
    pageName?: string
    children?: React.ReactNode
}

export const Template: React.FC<TemplateProps> = ({ children, pageName }) => {
    return <div className="flex flex-col gap-6 p-6 md:items-center">
                <Sidebar pageName={pageName} />
                {children}
           </div>
}