import clienteAxios from "../config/axios";
import type {User} from "../types";

export const registerUser = async (usuario: User) => {
    try {
        const response = await clienteAxios.post("/usuarios", usuario);
        return response;
    }catch (e) {
        throw e;
    }
}