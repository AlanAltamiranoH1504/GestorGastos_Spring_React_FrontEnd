import clienteAxios from "../config/axios";
import type {FormLoginUser, User} from "../types";

export const registerUser = async (usuario: User) => {
    try {
        const response = await clienteAxios.post("/usuarios", usuario);
        return response;
    }catch (e) {
        throw e;
    }
}

export const loginUser = async (usuario: FormLoginUser) => {
    try {
        const response = await clienteAxios.post("/login", usuario);
        return response;
    }catch (e) {
        throw e;
    }
}

//Funciones para usuarioController
export const findByEmail = async (email: string) => {
    const token = localStorage.getItem("AUTH_TOKEN_SPRING_GG");
    try {
        const response = await clienteAxios.get(`/usuarios/email/${email}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return response.data;
    }catch (e) {
        throw e;
    }
}