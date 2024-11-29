import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../images/logo.webp'; // Importe a imagem da logo
import user from '../images/user.webp'; // Importe a imagem do ícone de usuário
import { useAuth } from '../context/AuthContext'; // Importe o contexto de autenticação

const Navbar: React.FC = () => {
    const { user: loggedInUser, logout } = useAuth(); // Verifica se o usuário está autenticado e obtém a função de logout
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Remove o token e os dados do usuário do contexto
        navigate('/login'); // Redireciona para a página de login
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* Logo e Título */}
                <div className="logo-container">
                    <img src={logo} alt="Logo Atlatis" className="logo-image" />
                    <Link className="logo" to="/">Atlantis</Link>
                </div>
                {/* Botão de Login ou Logout */}
                <div className="user-container">
                    <img src={user} alt="Usuário" className="user-icon" />
                    {loggedInUser ? (
                        <button onClick={handleLogout} className="logout-button">
                            Sair
                        </button>
                    ) : (
                        <Link to="/login" className="login-button">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
