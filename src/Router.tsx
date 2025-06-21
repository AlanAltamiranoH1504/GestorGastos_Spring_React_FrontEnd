import {BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/LoginView";
import AppLayout from "./layouts/AppLayout";
import AdministracionView from "./views/AdministracionView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path="/auth/registro" element={<RegisterView/>}></Route>
                    <Route path="/auth/login" element={<LoginView/>}></Route>
                </Route>

                <Route element={<AppLayout/>}>
                    <Route path="/administracion" element={<AdministracionView/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}