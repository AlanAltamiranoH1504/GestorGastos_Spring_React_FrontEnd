import {Fragment} from "react";
import type {GastoPorDiaBackend} from "../types";
import {formatCurrency, formatDate} from "../utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteGastoPorDiaPeticion} from "../api/springboot_api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

type GastoPorDiaProps = {
    gasto: GastoPorDiaBackend
}
const GastoPorDia = ({gasto}: GastoPorDiaProps) => {
    const queryClient = useQueryClient();

    const eliminarGasto = (id: number) => {
        mutationEliminarGasto.mutate(id);
    }

    const mutationEliminarGasto = useMutation({
        mutationKey: ["deleteGastoById"],
        mutationFn: deleteGastoPorDiaPeticion,
        onSuccess: (result) => {
            toast.success(result.msg);
            queryClient.invalidateQueries({
                queryKey: ["findAllGastosPorDia"]
            });
        },
        onError: () => {
            toast.error("Error en la eliminiación de gasto.");
        }
    });

    return (
        <Fragment>
            <tr className="hover:bg-gray-200 text-center">
                <td className="px-6 py-2 text-sm text-gray-800">{gasto.id}</td>
                <td className="px-6 py-2 text-sm text-gray-800">{formatCurrency(gasto.neto)}</td>
                <td className="px-6 py-2 text-sm text-gray-800">{gasto.iva}</td>
                <td className="px-6 py-2 text-sm text-gray-800">{formatCurrency(gasto.total)}</td>
                <td className="px-6 py-2 text-sm text-gray-800">{formatDate(gasto.fecha)}</td>
                <td className="px-6 py-2 text-sm text-gray-800">{gasto.descripcion}</td>
                <td className="px-6 py-2 text-sm text-gray-800">{gasto.proveedor.nombre}</td>
                <td className="px-6 py-2 text-sm flex justify-around align-middle">
                    <Link to={`/gastos-por-dia/${gasto.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                             className="size-4">
                            <path fillRule="evenodd"
                                  d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
                                  clipRule="evenodd"/>
                        </svg>
                    </Link>
                    <button className="text-red-600"
                            onClick={() => {
                                eliminarGasto(gasto.id)
                            }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                             className="size-4">
                            <path fillRule="evenodd"
                                  d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                </td>
            </tr>
        </Fragment>
    );
}
export default GastoPorDia;
