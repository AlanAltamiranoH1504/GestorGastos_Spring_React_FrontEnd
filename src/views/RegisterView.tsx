import {Fragment} from "react";
import FormRegister from "../components/FormRegister";

const RegisterView = () => {
    return (
        <Fragment>
            <h1 className="text-center text-4xl text-white font-bold">Crear una Nueva Cuenta</h1>
            <FormRegister/>
        </Fragment>
    );
}
export default RegisterView;