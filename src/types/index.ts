export type FormUserRegister = {
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    password2: string
}
export type UsuarioLogeado = {
    nombre: string;
    email: string;
    password: string;
    perfilId: number;
    estadoId: number;
    imagen: string
}

export type FormLoginUser = Pick<FormUserRegister, "email" | "password">
export type User = Pick<FormUserRegister, "nombre" | "apellidos" | "email" | "password" >