import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import type {UpdateUsuario} from "../types";
import {updateImagenPerfilUsuario, updateInformacionUsuario} from "../api/springboot_api";
import {toast} from "react-toastify";

const FormEditarPerfil = () => {
    const queryClient = useQueryClient();
    const usuarioEnSesionCache: UpdateUsuario    = queryClient.getQueryData<UpdateUsuario>(["findUsuarioByEmail"]) as UpdateUsuario;
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            "id": usuarioEnSesionCache.id,
            "nombre": usuarioEnSesionCache.nombre,
            "apellidos": usuarioEnSesionCache.apellidos,
            "email": usuarioEnSesionCache.email,
            "imagenURL": "",
            "perfilId": usuarioEnSesionCache.perfilId,
            "estadoId": usuarioEnSesionCache.estadoId,
            "password": ""
        }
    });

    function handleUpdateInformacion(data: UpdateUsuario) {
        mutationUpdateInformacionUsuario.mutate(data);
        if (data.imagenURL[0]){
            const formData = new FormData();
            formData.append("imagenURL", data.imagenURL[0]);
            mutationUpdateImagenPerfil.mutate(formData);
        }
    }

    const mutationUpdateInformacionUsuario = useMutation({
        mutationFn: updateInformacionUsuario,
        onSuccess: () => {
            toast.success("Información actualizada correctamente.")
            queryClient.invalidateQueries({
                queryKey: ["findUsuarioByEmail"]
            });
        },
        onError: (e: Error) => {
            console.log(e)
            toast.error("Error en la actualización.")
        }
    });

    const mutationUpdateImagenPerfil = useMutation({
        mutationFn: updateImagenPerfilUsuario,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["findUsuarioByEmail"]
            })
        },
        onError: () => {
            toast.error("Error en la actualizacion de imagen de perfil")
        }
    });

    return (
        <>
            <div className="bg-white shadow-sm border rounded-lg p-5">
                <h2 className="text-center text-2xl font-bold uppercase">Edita tu Perfil</h2>
                <form className="space-y-3 p-5"
                      onSubmit={handleSubmit(handleUpdateInformacion)}
                >
                    <input type="hidden"
                           {...register("id")}
                    />
                    <input type="hidden"
                           {...register("perfilId")}
                    />
                    <input type="hidden"
                           {...register("estadoId")}
                    />
                    <div>
                        <label htmlFor="nombre"
                               className="text-lg font-semibold text-slate-600 block pb-2">Nombre:</label>
                        <input type="text" className="border border-gray-300 p-2 w-full rounded-lg"
                               placeholder="Nombre de Usuario"
                               {...register("nombre", {
                                   required: "El nombre de usuario es obligatorio"
                               })}
                        />
                        <div className="text-center text-red-600 font-semibold bg-red-200 rounded-md mt-1">
                            {errors.nombre && String(errors.nombre.message)}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="apellidos"
                               className="text-lg font-semibold text-slate-600 block pb-2">Apellidos:</label>
                        <input type="text" className="border border-gray-300 p-2 w-full rounded-lg"
                               placeholder="Apellidos del usuario"
                               {...register("apellidos", {
                                   required: "Los apellidos son obligatorios"
                               })}
                        />
                        <div className="text-center text-red-600 font-semibold bg-red-200 rounded-md mt-1">
                            {errors.apellidos && String(errors.apellidos.message)}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email"
                               className="text-lg font-semibold text-slate-600 block pb-2">Email:</label>
                        <input type="email" className="border border-gray-300 p-2 w-full rounded-lg"
                               placeholder="E-mail de registro"
                               {...register("email", {
                                   required: "El email es obligatorio",
                                   pattern: {
                                       value: /\S+@\S+\.\S+/,
                                       message: "Formato de email incorrecto"
                                   }
                               })}
                        />
                        <div className="text-center text-red-600 font-semibold bg-red-200 rounded-md mt-1">
                            {errors.email && String(errors.email.message)}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password"
                               className="text-lg font-semibold text-slate-600 block pb-2">Password:</label>
                        <input type="password" className="border border-gray-300 p-2 w-full rounded-lg"
                               placeholder="Minimo 5 caracteres"
                               {...register("password", {
                                   required: "El password es obligatorio",
                                   minLength: {
                                       value: 5,
                                       message: "El password debe tener al menos 5 caracteres"
                                   }
                               })}
                        />
                        <div className="text-center text-red-600 font-semibold bg-red-200 rounded-md mt-1">
                            {errors.password && String(errors.password.message)}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="imagen" className="text-lg font-semibold text-slate-600 block pb-2">Imagen de
                            Perfil</label>
                        <input
                            type="file"
                            className="border border-gray-300 p-2 w-full rounded-lg"
                            accept="image/*"
                            {...register("imagenURL")}
                        />
                    </div>
                    <div>
                        <input type="submit" value="Actualizar Datos"
                               className="border p-2 w-full rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600"/>
                    </div>
                </form>
            </div>
        </>
    );
}
export default FormEditarPerfil;