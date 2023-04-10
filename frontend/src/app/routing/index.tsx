import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../../pages/Login";
import { Register } from "../../pages/Register";
import { Lists } from "../../pages/Lists";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/listas" element={<Lists />} />
            </Routes>
        </BrowserRouter>
    );
}