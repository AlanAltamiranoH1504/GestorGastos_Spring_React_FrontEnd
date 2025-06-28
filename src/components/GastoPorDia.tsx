import {Fragment} from "react";
import type {GastoPorDiaBackend} from "../types";
import {formatCurrency, formatDate} from "../utils";

type GastoPorDiaProps = {
    gasto: GastoPorDiaBackend
}
const GastoPorDia = ({gasto}: GastoPorDiaProps) => {
    return (
        <Fragment>
            <tr className="hover:bg-gray-200 text-center">
                <td className="px-6 py-2 text-sm text-gray-800">{gasto.id}</td>
                <td className="px-6 py-2 text-sm text-gray-800">{formatCurrency(gasto.neto)}</td>
                <td className="px-6 py-2 text-sm text-gray-800">{gasto.iva}</td>
                <td className="px-6 py-2 text-sm text-gray-800">{formatCurrency(gasto.total)}</td>
                <td className="px-6 py-2 text-sm text-gray-800">{formatDate(gasto.fecha)}</td>
                <td className="px-6 py-2 text-sm text-gray-800">{gasto.descripcion}</td>
                {/*<td className="px-6 py-2 text-sm text-gray-800">{gasto.proveedor.nombre}</td>*/}
            </tr>
        </Fragment>
    );
}
export default GastoPorDia;