import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../app/services/api";

import "./styles.css";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>, email: string, password: string) {
        event.preventDefault();

        try {
            const response = await api.post('api/login', { email, password });
            localStorage.setItem('token', response.data.token);

            history('/listas');
        } catch (error) {
            
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <form onSubmit={(event) => handleSubmit(event, email, password)}>
                    <input
                        placeholder="E-mail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <input
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#3498db" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
        </div>
    );
}