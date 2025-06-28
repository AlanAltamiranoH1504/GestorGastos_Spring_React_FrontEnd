import {BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/LoginView";
import AppLayout from "./layouts/AppLayout";
import AdministracionView from "./views/AdministracionView";
import FormEditarPerfil from "./components/FormEditarPerfil";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/*Rutas de autenticacion y registro*/}
                <Route element={<AuthLayout/>}>
                    <Route path="/auth/registro" element={<RegisterView/>}></Route>
                    <Route path="/auth/login" element={<LoginView/>}></Route>
                </Route>

                {/*rRutas de area protegida*/}
                <Route element={<AppLayout/>}>
                    <Route path="/administracion" element={<AdministracionView/>}></Route>
                    <Route path="/perfil/editar" element={<FormEditarPerfil/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}