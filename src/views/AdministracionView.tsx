import {useQuery} from "@tanstack/react-query";
import {findAllGsatosPorDia} from "../api/springboot_api";
import {toast} from "react-toastify";
import {Fragment, useEffect, useState} from "react";
import GastoPorDia from "../components/GastoPorDia";
import type {GastoPorDiaBackend} from "../types";

const AdministracionView = () => {
    const [gastosDia, setGastosDia] = useState<GastoPorDiaBackend[]>([]);
    const {data, isError} = useQuery({
        queryKey: ["findAllGastosPorDia"],
        queryFn: findAllGsatosPorDia,
        retry: 1,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (data){
            setGastosDia(data);
        }
    }, [data]);
    if (isError) {
        toast.error("Error en la busqueda de gastos por dia.")
    }
    return (
        <>
            <h2 className="text-3xl font-bold text-start uppercase">Gastos por Día</h2>
            <div className="overflow-x-auto rounded-md shadow-md mt-6">
                <table className="min-w-full bg-white divide-y divide-gray-400">
                    <thead className="bg-slate-900">
                        <tr>
                            <th className="px-6 py-2 text-center text-sm font-semibold text-white">Id</th>
                            <th className="px-6 py-2 text-center text-sm font-semibold text-white">Valor Neto</th>
                            <th className="px-6 py-2 text-center text-sm font-semibold text-white">IVA</th>
                            <th className="px-6 py-2 text-center text-sm font-semibold text-white">Total</th>
                            <th className="px-6 py-2 text-center text-sm font-semibold text-white">Fecha</th>
                            <th className="px-6 py-2 text-center text-sm font-semibold text-white">Descripción</th>
                            <th className="px-6 py-2 text-center text-sm font-semibold text-white">Proveedor</th>
                            <th className="px-6 py-2 text-center text-sm font-semibold text-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-400">
                        {gastosDia.map((gasto) => {
                            return (
                                <Fragment key={gasto.id}>
                                    <GastoPorDia
                                        gasto={gasto}
                                    />
                                </Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default AdministracionView;