import { Sidebar } from "@/components"


interface TemplateProps {
    children?: React.ReactNode
    pagename?: string
}

export const Template: React.FC<TemplateProps> = ({ children, pagename }) => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
                <Sidebar />    
                <main className="flex-1 justify-center  p-6 w-full text-right">
                    <h2 className="font-bold text-[#3d2929] text-3xl text-[#116343]">{pagename}</h2>   
                    <div className="mt-10 md:px-5 lg:px-20">
                        {children}
                    </div> 
                </main>
        </div>
    )
}