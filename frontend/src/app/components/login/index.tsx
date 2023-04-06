import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FiLogIn } from 'react-icons/fi';

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit() {

    }

    return (
        <div className="login-container">
            <section className="form">
                <form onSubmit={handleSubmit}>
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