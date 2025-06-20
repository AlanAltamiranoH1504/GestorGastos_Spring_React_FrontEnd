export type FormUserRegister = {
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    password2: string
}

export type User = Pick<FormUserRegister, "nombre" | "apellidos" | "email" | "password" >