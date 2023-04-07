import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";

import api from "../../app/services/api";
import "./styles.css";

export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const history = useNavigate();

    async function handleRegister(event: React.FormEvent<HTMLFormElement>, name: string, email: string, password: string, passwordConfirmation: string) {
        event.preventDefault();
        
        const data = {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation
        }

        try {
            if(password !== passwordConfirmation) {
                toast.error("As senhas não são iguais!");
                return;
            }

            if(password.length < 6) {
                toast.warning("A senha deve ter no mínimo 6 caracteres!");
                return;
            }
            
            api.post('api/register', data).then(async (response) => {
                if(response.data.status) {
                    const responseLogin = await api.post('api/login', { email, password });
                    localStorage.setItem('token', responseLogin.data.token);

                    history('/listas');
                    toast.success("Cadastro efetuado com sucesso!");
                }
            }).catch((response) => {
                toast.error(response.response.data.message);
            });
        } catch (error) {
            toast.error("Erro no cadastro, tente novamente.");
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e organize suas finanças.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#3498db" />
                        Fazer login
                    </Link>
                </section>
                <form onSubmit={(event) => handleRegister(event, name, email, password, passwordConfirmation)}>
                    <input
                        placeholder="Nome"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Confirme sua senha"
                        value={passwordConfirmation}
                        onChange={(event) => setPasswordConfirmation(event.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}