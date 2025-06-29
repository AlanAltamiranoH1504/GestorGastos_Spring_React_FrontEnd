import {Fragment, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {findAllProveedores, findGastoPorDiaByIdPeticion, updateGastoPorDiaPeticion} from "../api/springboot_api";
import type {GastoPorDia, GastoPorDiaBackend, Proveedor} from "../types";
import { useForm} from "react-hook-form";
import {toast} from "react-toastify";

const FormEditarGastoPorDia = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
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
    const {register, handleSubmit, reset, setValue, getValues, formState: {errors}} = useForm<GastoPorDia>();
    const updateGastoPorDia = (data: GastoPorDia) => {
        const gastoToUpdate: GastoPorDia = {
            ...data,
            id: Number(id)
        }
        mutationUpdateGastoPorDia.mutate(gastoToUpdate);
    }

    const mutationUpdateGastoPorDia = useMutation({
        mutationKey: ["updateGastoPorDia"],
        mutationFn: updateGastoPorDiaPeticion,
        onSuccess: () => {
            toast.success("Gasto por dia actualizado correctamente.")
            queryClient.invalidateQueries({
                queryKey: ["findAllGastosPorDia"]
            });
            navigate("/administracion");
        },
        onError: () => {
            toast.error("Error en actulizacion de gasto.")
        }
    })

    useEffect(() => {
        if (data) {
            reset({
                neto: data.neto,
                iva: data.iva,
                total: data.total,
                descripcion: data.descripcion,
                proveedorId: data.proveedor.id
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
                            onChange={(e) => {
                                const nuevoNeto = Number(e.target.value);
                                setValue("neto", nuevoNeto);
                                const ivaSeleccionado = Number(getValues("iva"));
                                const neto = Number(getValues("neto"));
                                const nuevoTotal = neto * (1 + ivaSeleccionado);
                                setValue("total", nuevoTotal);
                            }}
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
                            onChange={(e) => {
                                const nuevoIva: number = Number(e.target.value);
                                setValue("iva", nuevoIva);
                                const nuevoTotal = getValues("neto") * (1 + nuevoIva);
                                setValue("total", nuevoTotal);
                            }}
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
                                {...register("proveedorId", {
                                    required: "El proveedor es obligatorio"
                                })}
                        >
                            <option value="">--- Selecciona un Proveedor ----</option>
                            {proveedores.map((proveedor: Proveedor) => {
                                if (proveedor.id === data?.proveedor.id) {
                                    return (
                                        <option value={proveedor.id} key={proveedor.id} selected={true}>{proveedor.nombre}</option>
                                    )
                                }
                                return (
                                    <option value={proveedor.id} key={proveedor.id}>{proveedor.nombre}</option>
                                )
                            })}
                        </select>
                        <div className="border text-red-600 text-center font-semibold bg-red-200 rounded-md mt-1">
                            {errors.proveedorId && String(errors.proveedorId.message)}
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