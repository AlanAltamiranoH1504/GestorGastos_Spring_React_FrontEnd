import {useForm} from "react-hook-form";
import {useMutation, useQuery} from "@tanstack/react-query";
import {findAllProveedores, saveGastoPorDiaPeticion} from "../api/springboot_api";
import type {GastoPorDia, Proveedor} from "../types";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import * as React from "react";
import {useNavigate} from "react-router-dom";

const FormGastoPorDia = () => {
    const navigate = useNavigate();
    const [proveedores, setProveedores] = useState<Proveedor[]>([]);
    const [neto, setNeto] = useState(0);
    const [total, setTotal] = useState(0);

    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        defaultValues: {
            "neto": 0,
            "iva": "",
            "total": total,
            "descripcion": "",
            "proveedorId": null
        }
    });
    const {data, isError} = useQuery<Proveedor[]>({
        queryKey: ["findAllProveedores"],
        retry: 1,
        refetchOnWindowFocus: false,
        queryFn: findAllProveedores
    });
    if (isError) {
        toast.error("Hubo un error en la carga de proveedores");
    }
    const guardarGastoPorDia = (data: GastoPorDia) => {
        mutationSaveGastoPorDia.mutate(data);
    }

    const mutationSaveGastoPorDia = useMutation({
        mutationKey: ["saveGastoPorDia"],
        mutationFn: saveGastoPorDiaPeticion,
        onSuccess: () => {
            toast.success("Gasto por dia guardado.")
            navigate("/administracion");
        },
        onError: () => {
            toast.error("Error en guardado de gasto por dia");
        }
    });
    useEffect(() => {
        if (data) {
            setProveedores(data)
        }
    }, [data]);

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-sm border rounded-lg p-5">
            <h2 className="text-center text-2xl font-bold">Agregar Gasto por Dia</h2>
            <form
                onSubmit={handleSubmit(guardarGastoPorDia)}
            >
                <div className="my-4">
                    <label htmlFor="neto" className="mb-2 text-lg text-gray-700 font-semibold">Neto del Gasto:</label>
                    <input
                        type="number"
                        className="border p-2 w-full rounded-lg border-gray-300"
                        placeholder="Valor neto del gasto"
                        {...register("neto", {
                            required: "El neto del gasto es obligatorio",
                            pattern: {
                                value: /^\d+(\.\d+)?$/,
                                message: "El neto debe ser un valor mayor a 0"
                            }
                        })}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const nuevoNeto: number = +e.target.value;
                            setNeto(nuevoNeto);
                        }}
                    />
                    <div className="text-center text-red-600 font-semibold bg-red-200 rounded-md mt-1">
                        {errors.neto && String(errors.neto.message)}
                    </div>
                </div>
                <div className="my-4">
                    <label htmlFor="iva" className="mb-2 text-lg text-gray-700 font-semibold block">IVA:</label>
                    <select
                        className="border p-2 w-full rounded-lg"
                        {...register("iva", {
                            required: "El IVA es obligatorio"
                        })}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            const total: number = neto * (1 + +e.target.value);
                            setTotal(total)
                            setValue("total", total);
                        }}
                    >
                        <option value="">--- Selecciona una Opción ---</option>
                        <option value=".16">16% de IVA</option>
                        <option value=".32">32% de IVA</option>
                    </select>
                    <div className="text-center text-red-600 font-semibold bg-red-200 rounded-md mt-1">
                        {errors.iva && String(errors.iva.message)}
                    </div>
                </div>
                <div className="my-4">
                    <label htmlFor="total" className="mb-2 text-lg text-gray-700 font-semibold">Total:</label>
                    <input
                        type="number"
                        className="border p-2 w-full rounded-lg border-gray-300"
                        placeholder="Valor total de gasto"
                        value={total}
                        readOnly={true}
                        {...register("total", {
                            required: "El total del gasto es obligatorio",
                            pattern: {
                                value: /^\d+(\.\d+)?$/,
                                message: "El total del gasto deber mayor a 0"
                            }
                        })}
                    />
                    <div className="text-center text-red-600 font-semibold bg-red-200 rounded-md mt-1">
                        {errors.total && String(errors.total.message)}
                    </div>
                </div>
                <div className="my-4">
                    <label htmlFor="descripcion"
                           className="mb-2 text-lg text-gray-700 font-semibold">Descripción</label>
                    <textarea
                        className="border p-2 w-full rounded-lg"
                        placeholder="Descripcion del gasto"
                        rows={7}
                        {...register("descripcion", {
                            required: "La descripcion es obligatorioa",
                            maxLength: {
                                value: 300,
                                message: "La descripcion no debe ser mayor a 300 caracteres"
                            }
                        })}
                    ></textarea>
                    <div className="text-center text-red-600 font-semibold bg-red-200 rounded-md mt-1">
                        {errors.descripcion && String(errors.descripcion.message)}
                    </div>
                </div>
                <div className="my-4">
                    <label htmlFor="proveedorId" className="mb-2 text-lg text-gray-700 font-semibold">Proveedor:</label>
                    <select className="border p-2 w-full rounded-lg"
                            {...register("proveedorId", {
                                required: "El proveedor es obligatorio"
                            })}
                    >
                        <option value="">--- Selecciona un Proveedor ----</option>
                        {proveedores.map((proveedor: Proveedor) => (
                            <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>
                        ))}
                    </select>
                    <div className="text-center text-red-600 font-semibold bg-red-200 rounded-md mt-1">
                        {errors.proveedorId && String(errors.proveedorId.message)}
                    </div>
                </div>
                <div className="mt-4">
                    <input type="submit" value="Guardar Gasto Por Dia"
                           className="border p-2 text-center w-full font-semibold rounded-lg text-white cursor-pointer bg-blue-500 hover:bg-blue-600"/>
                </div>
            </form>
        </div>
    );
}
export default FormGastoPorDia;