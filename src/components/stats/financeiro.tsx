import { useState } from "react"

export const TotalReceitaBox = () => {

    const [totalMes, setTotalMes] = useState(2.000);

    return (
        <div className="border-2 border-[#B77306] rounded-2xl p-6 bg-[#DBFFF7]">
            <h2>Total do Mês</h2>
            <p>R${totalMes}</p>
        </div>
    )
}

export const TotalPagamentosBox = () => {

    const [totalMes, setTotalMes] = useState(2.000);

    return (
        <div className="border-2 border-[#116343] rounded-2xl p-6 bg-[#DBFFF7]">
            <h2>Total de Receita</h2>
            <p>R${totalMes}</p>
        </div>
    )
}

export const TotalDespesasBox = () => {

    const [totalMes, setTotalMes] = useState(2.000);

    return (
        <div className="border-2 border-[#C4505C] rounded-2xl p-6 bg-[#DBFFF7]">
            <h2>Despesas</h2>
            <p>R${totalMes}</p>
        </div>
    )
}
