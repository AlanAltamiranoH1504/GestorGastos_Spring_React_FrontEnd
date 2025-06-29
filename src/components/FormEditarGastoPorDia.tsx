import {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {findAllProveedores, findGastoPorDiaByIdPeticion} from "../api/springboot_api";
import type {GastoPorDia, GastoPorDiaBackend, Proveedor} from "../types";
import { useForm} from "react-hook-form";

const FormEditarGastoPorDia = () => {
    const {id} = useParams();
    const [proveedores, setProveedores] = useState<Proveedor[]>([]);
    const {data: proveedoresData} = useQuery<Proveedor[]>({
        queryKey: ["findAllProveedores"],
        retry: 1,
        refetchOnWindowFocus: false,
        queryFn: findAllProveedores
    });

    const {data} = useQuery<GastoPorDiaBackend>({
        queryKey: ["findGastoPorDiaById"],
        retry: 1,
        refetchOnWindowFocus: false,
        queryFn: () => findGastoPorDiaByIdPeticion(Number(id))
    });
    const {register, handleSubmit, reset, formState: {errors}} = useForm<GastoPorDia>();
    const updateGastoPorDia = (data: GastoPorDia) => {
        console.log(data)
    }

    useEffect(() => {
        if (data) {
            reset({
                neto: data.neto,
                iva: data.iva,
                total: data.total,
                descripcion: data.descripcion,
                proveedor: data.proveedor
            });
        }
        if (proveedoresData) {
            setProveedores(proveedoresData);
        }
    }, [data, proveedoresData]);

    return (
        <Fragment>
            <div className="max-w-5xl mx-auto bg-white shadow-md border rounded-lg p-5">
                <h2 className="text-center text-2xl font-bold">Editar Gasto por Día</h2>
                <form
                    onSubmit={handleSubmit(updateGastoPorDia)}
                >
                    <div className="my-4">
                        <label htmlFor="neto" className="mb-2 text-lg text-gray-700 font-semibold">Neto del
                            Gasto:</label>
                        <input
                            type="number"
                            className="border p-2 w-full rounded-lg border-gray-300"
                            placeholder="Valor neto del gasto"
                            {...register("neto", {
                                required: "El neto del gasto es obligatorio"
                            })}
                        />
                        <div className="border text-red-600 text-center font-semibold bg-red-200 rounded-md mt-1">
                            {errors.neto && String(errors.neto.message)}
                        </div>
                    </div>
                    <div className="my-4">
                        <label htmlFor="iva" className="mb-2 text-lg text-gray-700 font-semibold block">IVA:</label>
                        <select
                            className="border p-2 w-full rounded-lg"
                            {...register("iva", {
                                required: "El iva es obligatorio"
                            })}
                        >
                            <option value="">--- Selecciona una Opción ---</option>
                            <option value={0.16}>16% de IVA</option>
                            <option value={0.32}>32% de IVA</option>
                        </select>
                        <div className="border text-red-600 text-center font-semibold bg-red-200 rounded-md mt-1">
                            {errors.iva && String(errors.iva.message)}
                        </div>
                    </div>
                    <div className="my-4">
                        <label htmlFor="total" className="mb-2 text-lg text-gray-700 font-semibold">Total:</label>
                        <input
                            type="number"
                            className="border p-2 w-full rounded-lg border-gray-300"
                            placeholder="Valor total de gasto"
                            // value={total}
                            {...register("total", {
                                required: "El total es obligatorio"
                            })}
                            readOnly={true}
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="descripcion"
                               className="mb-2 text-lg text-gray-700 font-semibold">Descripción</label>
                        <textarea
                            className="border p-2 w-full rounded-lg"
                            placeholder="Descripcion del gasto"
                            rows={7}
                            {...register("descripcion", {
                                required: "La descripción es obligatoria",
                                maxLength: {
                                    value: 300,
                                    message: "El maximo de la descripción es 300 caracteres"
                                }
                            })}
                        ></textarea>
                        <div className="border text-red-600 text-center font-semibold bg-red-200 rounded-md mt-1">
                            {errors.descripcion && String(errors.descripcion.message)}
                        </div>
                    </div>
                    <div className="my-4">
                        <label htmlFor="proveedorId"
                               className="mb-2 text-lg text-gray-700 font-semibold">Proveedor:</label>
                        <select className="border p-2 w-full rounded-lg"
                                {...register("proveedor", {
                                    required: "El proveedor es obligatorio"
                                })}
                        >
                            <option value="">--- Selecciona un Proveedor ----</option>
                            {proveedores.map((proveedor: Proveedor) => (
                                <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>
                            ))}
                        </select>
                        <div className="border text-red-600 text-center font-semibold bg-red-200 rounded-md mt-1">
                            {errors.proveedor && String(errors.proveedor.message)}
                        </div>
                    </div>
                    <div className="mt-4">
                        <input type="submit" value="Actualizar Gasto por Día"
                               className="border p-2 text-lg text-center w-full font-semibold rounded-lg text-white cursor-pointer bg-blue-500 hover:bg-blue-600"/>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}
export default FormEditarGastoPorDia;