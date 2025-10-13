import { useState } from "react"

export const TotalReceitaBox = () => {

    const [totalMes, setTotalMes] = useState(2.000);

    return (
        <div className="text-center flex flex-col justify-center gap-1 text-[#B77306] border-2 border-[#B77306] rounded-2xl py-4 bg-[#DBFFF7]">
            <h2 className="font-bold text-lg">Total do Mês</h2>
            <p>R${totalMes}</p>
        </div>
    )
}

export const TotalPagamentosBox = () => {

    const [totalMes, setTotalMes] = useState(2.000);

    return (
        <div className="text-center flex flex-col justify-center gap-1 text-[#116343] border-2 border-[#116343] rounded-2xl py-4 bg-[#DBFFF7]">
            <h2 className="font-bold text-lg">Total de Receita</h2>
            <p>R${totalMes}</p>
        </div>
    )
}

export const TotalDespesasBox = () => {

    const [totalMes, setTotalMes] = useState(2.000);

    return (
        <div className="text-center flex flex-col justify-center gap-1 text-[#C4505c] border-2 border-[#C4505C] rounded-2xl py-4 bg-[#DBFFF7]">
            <h2 className="font-bold text-lg">Despesas</h2>
            <p>R${totalMes}</p>
        </div>
    )
}
