import {Fragment, use} from "react";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import type {FormUserRegister} from "../types";
import {registerUser} from "../api/springboot_api";
import {toast} from "react-toastify";
import FooterFormAuth from "./FooterFormAuth";

const FormRegister = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormUserRegister>();

    const saveUsuarioNuevo = (data: FormUserRegister) => {
        const userData = data;
        mutation.mutate(userData);
    }

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast.success(data.data.mensaje);
        },
        onError: (error) => {
            toast.error(error.response.data.error);
        }
    })
    return (
        <Fragment>
            <div className="bg-white shadow border rounded-lg my-10 px-5 py-8">
                <h2 className="text-center text-lg text-blue-600 font-bold mb-2">Gestiona tu Gastos Facilmente</h2>
                <form
                    onSubmit={handleSubmit(saveUsuarioNuevo)}
                >
                    <div className="mb-4">
                        <label htmlFor="nombre" className="font-bold block text-lg text-slate-600 mb-2">Nombre:</label>
                        <input type="text" id="nombre" placeholder="Ingresa tu nombre"
                               className="border border-slate-300 p-2 w-full rounded-lg"
                               {...register("nombre", {
                                   required: "El nombre es obligatorio"
                               })}
                        />
                        <div className="text-red-700 text-center font-bold">
                            {errors.nombre && String(errors.nombre.message)}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="apellidos"
                               className="font-bold block text-lg text-slate-600 mb-2">Apellidos:</label>
                        <input type="text" id="apellidos" placeholder="Ingresa tus apellidos"
                               className="border border-b-slate-300 p-2 w-full rounded-lg"
                               {...register("apellidos", {
                                   required: "Los apellidos son obligatorios"
                               })}
                        />
                        <div className="text-red-700 text-center font-bold">
                            {errors.apellidos && String(errors.apellidos.message)}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="font-bold block text-lg text-slate-600 mb-2">E-Mail:</label>
                        <input type="email" id="email"
                               className="border border-b-slate-300 p-2 w-full rounded-lg"
                               placeholder="Email de registro"
                               {...register("email", {
                                   required: "El e-mail es obligatorio",
                                   pattern: {
                                       value: /\S+@\S+\.\S+/,
                                       message: "Formato de email no valido"
                                   }
                               })}
                        />
                        <div className="text-red-700 text-center font-bold">
                            {errors.email && String(errors.email.message)}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password"
                               className="font-bold block text-lg text-slate-600 mb-2">Password:</label>
                        <input type="password" id="password"
                               className="border border-b-slate-300 p-2 w-full rounded-lg"
                               placeholder="Minimo 5 caracteres"
                               {...register("password", {
                                   required: "El password es obligatorio",
                                   minLength: {
                                       value: 5,
                                       message: "El password debe tener al menos 5 caracteres"
                                   }
                               })}
                        />
                        <div className="text-red-700 text-center font-bold">
                            {errors.password && String(errors.password.message)}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password2" className="font-bold block text-lg text-slate-600 mb-2">Confirmar
                            Password:</label>
                        <input type="password" name="password2" id="password2"
                               className="border border-b-slate-300 p-2 w-full rounded-lg"
                               placeholder="Confirmar Password"/>
                    </div>
                    <div className="my-4">
                        <input type="submit" value="Registrar Cuenta"
                               className="border w-full p-2 bg-blue-400 rounded-lg text-white font-semibold cursor-pointer hover:bg-blue-500"/>
                    </div>
                    {<FooterFormAuth/>}
                </form>
            </div>
        </Fragment>
    );
}
export default FormRegister;