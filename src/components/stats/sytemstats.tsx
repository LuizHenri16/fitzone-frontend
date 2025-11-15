import api from "@/services/api";
import { useEffect, useState } from "react"

export const StatusCustomers = () => {

    const [activeCustomers, setActiveCustomers] = useState(0);
    const [registeredCustomers, setRegisteredCustomers] = useState(0);

    useEffect(() => {
        api.get("/customer/activecustomers")
            .then(response => {
                setActiveCustomers(response.data.ativos);
            })
            .catch(error => {
                setActiveCustomers(0);
            });

        api.get("/customer/registeredcustomers")
            .then(response => {
                setRegisteredCustomers(response.data.registrados);
            })
            .catch(error => {
                setRegisteredCustomers(0); 
            });
    }, [])

    return (
        <div className="shadow-md rounded-2xl border-2 border-[#C1C1C1] overflow-x-auto w-full mx-auto">
            <table className="text-center w-full">
                <thead >
                    <tr className="bg-[#F3F3F3] border-b-2 border-b-[#C1C1C1]">
                        <th className="p-1 text-[#6B3E23]"> Estatísticas do Sistema </th>
                    </tr>
                </thead>

                <tbody >
                    <tr className="w-full ">
                        <td className="flex justify-center px-3 py-5 gap-3 ">
                            <div className="flex flex-col items-center justify-center text-sm rounded-2xl border-2 p-2 border-[#C1C1C1]">
                                <div>
                                    <img src="/icons/pessoas-icon.svg" alt="pessoas icone" />
                                </div>
                                <p className="text-[#B77306] font-medium text-lg">{registeredCustomers || 0}</p>
                                <p className="font-light text-[#7E7E7E]">Alunos Cadastrados</p>
                            </div>

                            <div className=" w-[9rem] flex flex-col items-center justify-center  text-sm rounded-2xl border-2 p-2 border-[#C1C1C1]">
                                <div>
                                    <img src="/icons/pessoas-icon.svg" alt="pessoas icone" />
                                </div>
                                <p className="text-[#B77306] font-medium text-lg">{activeCustomers || 0}</p>
                                <p className="font-light text-[#7E7E7E]">Alunos Ativos</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}