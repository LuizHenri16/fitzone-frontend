'use client'

import React, { useEffect, useState } from "react";

interface BirthdayPersonName {
    name: string
}

export const BirthdayStatus = () => {

    const [birthday, setBirthday] = useState<BirthdayPersonName[]>([]);

    const dataFromDB: BirthdayPersonName[] = [
            { name: "Edilene Vieira" },
            { name: "Luiz Henrique" }
        ];

    useEffect(() => {
        setBirthday(dataFromDB);
        // lógica para acessar o endpoint e retornar os dados do banco de dados com o nome dos aniversariantes do dia
    }, [])

    return (
        <div className="shadow-md rounded-2xl border-2 border-[#C1C1C1] overflow-x-auto w-full mx-auto">
            <table className="text-center w-full">
                <thead className="">
                    <tr className="bg-[#F3F3F3] border-b-2 border-b-[#C1C1C1]">
                        <th className="p-1 text-[#6B3E23]">Aniversariante do Dia</th>
                    </tr>
                </thead>

                <tbody className="">
                    {
                        birthday.length === 0 ? (
                            <tr>
                                <td className="" colSpan={1}>Não tem aniversariantes hoje</td>
                            </tr>
                        ) : birthday.map((birthday, index) => (
                            <tr key={index}>
                                <td className="px-18 py-1 text-[#B77306]" >{birthday.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}