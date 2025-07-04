import clienteAxios from "../config/axios";
import type {FormLoginUser, GastoPorDia, UpdateUsuario, User} from "../types";

export const registerUser = async (usuario: User) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await clienteAxios.post("/usuarios", usuario);
        return response;
    } catch (e) {
        throw e;
    }
}

export const loginUser = async (usuario: FormLoginUser) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await clienteAxios.post("/login", usuario);
        return response;
    } catch (e) {
        throw e;
    }
}

//Funciones para usuarioController
export const findByEmail = async (email: string) => {
    const token = localStorage.getItem("AUTH_TOKEN_SPRING_GG");
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await clienteAxios.get(`/usuarios/email/${email}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return response.data;
    } catch (e) {
        throw e;
    }
}

export const updateInformacionUsuario = async (usuario: UpdateUsuario) => {
    const id: number = usuario.id;
    const token = localStorage.getItem("AUTH_TOKEN_SPRING_GG");
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await clienteAxios.put(`/usuarios/${id}`, usuario, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return response.data;
    } catch (e) {
        throw e;
    }
}

export const updateImagenPerfilUsuario = async (imagen: FormData) => {
    const token = localStorage.getItem("AUTH_TOKEN_SPRING_GG");
    try {
        const response = await clienteAxios.post(`/imagenes`, imagen, {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}


/**
 * FUNCIONES PARA ProveedorController
 */
export const findAllProveedores = async () => {
    const token = localStorage.getItem("AUTH_TOKEN_SPRING_GG");
    try {
        const response = await clienteAxios.get("/proveedores", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        const proveedores = response.data;
        return proveedores;
    } catch (e) {
        console.log(e);
    }
}

/**
 * FUNCIONES PARA GastoPorDiaController
 */
export const findAllGsatosPorDia = async () => {
    const token = localStorage.getItem("AUTH_TOKEN_SPRING_GG");
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await clienteAxios.get("/gastos-por-dia", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return response.data;
    } catch (e) {
        throw e;
    }
}

export const findGastoPorDiaByIdPeticion = async (id: number) => {
    const token = localStorage.getItem("AUTH_TOKEN_SPRING_GG");
    try {
        const response = await clienteAxios.get(`/gastos-por-dia/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return response.data;
    } catch (e) {
        console.log(e)
    }
}

export const saveGastoPorDiaPeticion = async (gasto: GastoPorDia) => {
    const token = localStorage.getItem("AUTH_TOKEN_SPRING_GG");
    try {
        const response = await clienteAxios.post("/gastos-por-dia", gasto, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return response.data;
    } catch (e) {
        console.log(e)
    }
}

export const updateGastoPorDiaPeticion = async (gastoPorDia: GastoPorDia) => {
    const token = localStorage.getItem("AUTH_TOKEN_SPRING_GG");
    try {
        const response = await clienteAxios.put(`/gastos-por-dia/${gastoPorDia.id}`, gastoPorDia, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return response.data;
    } catch (e) {
        console.log(e)
    }
}

export const deleteGastoPorDiaPeticion = async (id: number) => {
    const token = localStorage.getItem("AUTH_TOKEN_SPRING_GG");
    try {
        const response = await clienteAxios.delete(`/gastos-por-dia/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return response.data;
    } catch (e) {
        console.log(e)
    }
}