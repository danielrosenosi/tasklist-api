import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../app/services/api";

import "./styles.css";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();

    async function handleLogin(event: React.FormEvent<HTMLFormElement>, email: string, password: string) {
        event.preventDefault();
        
        try {
            const response = await api.post('api/login', { email, password });
            localStorage.setItem('token', response.data.token);

            history('/listas');
            toast.success("Login efetuado com sucesso!");
        } catch (error) {
            toast.error("Essa conta não existe! Ou você digitou as informações erradas.");
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <form onSubmit={(event) => handleLogin(event, email, password)}>
                    <h1>Faça seu login</h1>

                    <input
                        placeholder="E-mail"
                        value={email}
                        required
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <input
                        placeholder="Senha"
                        type="password"
                        value={password}
                        required
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/registro">
                        <FiLogIn size={16} color="#3498db" />
                        Criar conta
                    </Link>
                </form>
            </section>
        </div>
    );
}