import React, { useState } from "react";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit() {

    }

    return (
        <div className="login-container">
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <input>
                    </input>
                </form>
            </section>
        </div>
    );
}