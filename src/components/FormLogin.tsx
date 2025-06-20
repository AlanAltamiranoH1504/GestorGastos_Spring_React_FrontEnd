import {useForm} from "react-hook-form";
import {FormLoginUser} from "../types";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {loginUser} from "../api/springboot_api";
import {useNavigate} from "react-router-dom";
import FooterFormAuth from "./FooterFormAuth";

const FormLogin = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormLoginUser>();
    const navigate = useNavigate();

    function loginUserFuncion (data: FormLoginUser) {
        const loginRequest = data;
        requestLogin.mutate(loginRequest);
    }

    const requestLogin = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            const {token} = data.data;
            localStorage.setItem("AUTH_TOKEN_SPRIN_GG", token);
            console.log(token);
            toast.success("Login correcto");
            setTimeout(() => {
                navigate("/auth/registro");
            }, 3000)
        },
        onError: (error) => {
            toast.error(error.response.data.error);
        }
    })

    return (
        <>
            <div className="border py-10 px-5 bg-white shadow rounded-lg">
                <h2 className="text-center text-lg text-blue-600 font-bold mb-2">Gestiona tu Gastos Facilmente</h2>
                <form
                    onSubmit={handleSubmit(loginUserFuncion)}
                >
                    <div className="mb-4">
                        <label htmlFor="email" className="text-lg font-bold text-slate-600 mb-4">Email:</label>
                        <input type="email" className="border p-2 w-full rounded-lg border-slate-300"
                               placeholder="E-mail de registro"
                               {...register("email", {
                                   required: "El email es obligatorio",
                                   pattern: {
                                       value: /\S+@\S+\.\S+/,
                                       message: "Formato de email no valido"
                                   }
                               })}
                        />
                        <div className="text-red-600 text-center font-bold">
                            {errors.email && String(errors.email.message)}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-lg font-bold text-slate-600 mb-4">Password</label>
                        <input type="password" className="border p-2 w-full rounded-lg border-b-slate-300"
                               placeholder="******"
                               {...register("password", {
                                   required: "El password es obligatorio"
                               })}
                        />
                        <div className="text-red-600 text-center font-bold">
                            {errors.password && String(errors.password.message)}
                        </div>
                    </div>
                    <div className="">
                        <input type="submit"
                               className="border p-2 w-full bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 cursor-pointer"
                               value="Iniciar Sesión"/>
                    </div>
                </form>
                {<FooterFormAuth/>}
            </div>
        </>
    );
}
export default FormLogin;