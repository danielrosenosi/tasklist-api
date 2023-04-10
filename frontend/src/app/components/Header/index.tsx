import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FiPower } from 'react-icons/fi';
import { AppBar, Toolbar  } from '@material-ui/core';

import "./styles.css";

export function Header() {
    const [token] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    if(token === '' || token === null) {
        navigate("/");
    }

    function handleLogout() {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="header">
            <AppBar className="menu" position="static">
                <Toolbar>
                    <Link to="/listas" className="menu-title">
                        <h1>Task Manager</h1>
                    </Link>

                    <button className="menu-button" onClick={handleLogout} type="button" title="Sair do sitema">
                        <FiPower size={18} color="#fff" />
                    </button>
                </Toolbar>
            </AppBar>
        </div>
    );
}