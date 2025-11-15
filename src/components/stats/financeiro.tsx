import api from "@/services/api";
import { useEffect, useState } from "react";

export const FinanceBoxes = () => {
  const [totalMes, setTotalMes] = useState(0);
  const [despesas30Dias, setDespesas30Dias] = useState(0);
  const [pagamentos30Dias, setPagamentos30Dias] = useState(0);

  const fetchTotalPagamentosDespesas = async () => {
    try {
      const responsePagamentos = await api.get("finance/payment/total");
      if (responsePagamentos.status === 200) {
        setPagamentos30Dias(responsePagamentos.data.valor);
      }

      const responseDespesas = await api.get("finance/expense/total");
      if (responseDespesas.status === 200) {
        setDespesas30Dias(responseDespesas.data.valor);
      }
    } catch (error) {
      console.error("Erro ao buscar dados financeiros:", error);
    }
  };

  useEffect(() => {
    fetchTotalPagamentosDespesas();
  }, []);

  useEffect(() => {
    setTotalMes(pagamentos30Dias - despesas30Dias);
  }, [pagamentos30Dias, despesas30Dias]);

  return (
    <div className="flex gap-10">
      {/* Total do Mês */}
      <div className="w-full text-center flex flex-col justify-center gap-1 text-[#B77306] border-2 border-[#B77306] rounded-2xl py-4 bg-[#DBFFF7]">
        <h2 className="font-bold text-lg">Total do Mês</h2>
        <p>R${totalMes}</p>
      </div>

      {/* Receita */}
      <div className="w-full text-center flex flex-col justify-center gap-1 text-[#116343] border-2 border-[#116343] rounded-2xl py-4 bg-[#DBFFF7]">
        <h2 className="font-bold text-lg">Total de Receita</h2>
        <p>R${pagamentos30Dias}</p>
      </div>

      {/* Despesas */}
      <div className="w-full text-center flex flex-col justify-center gap-1 text-[#C4505c] border-2 border-[#C4505C] rounded-2xl py-4 bg-[#DBFFF7]">
        <h2 className="font-bold text-lg">Despesas</h2>
        <p>R${despesas30Dias}</p>
      </div>
    </div>
  );
};
