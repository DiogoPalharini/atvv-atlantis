import React, { useState } from 'react';
import api from '../services/api'; // Importa o Axios configurado
import { useAuth } from '../context/AuthContext'; // Contexto de autenticação
import '../styles/login.css';

const Login: React.FC = () => {
    const { login } = useAuth(); // Função para salvar o estado de autenticação
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); // Mensagem de erro

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError(null); // Limpa mensagens de erro anteriores

            // Requisição ao backend para autenticar o usuário
            const response = await api.post('/login', {
                email,
                senha: password, // O backend espera "senha"
            });

            // Salva o token e os dados do usuário no contexto
            login(response.data.token, response.data.usuario);

            // Redireciona para a página inicial após o login
            window.location.href = '/';
        } catch (err: any) {
            // Lida com erros de autenticação
            setError(err.response?.data?.error || 'Erro ao realizar login.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1 className="login-title">Login</h1>
                {error && <p className="login-error">{error}</p>} {/* Exibe erros */}
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu e-mail"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        required
                    />
                </div>
                <button type="submit" className="login-button">
                    Entrar
                </button>
                <div className="login-links">
                    <a href="/register" className="register-link">
                        Registrar-se
                    </a>
                </div>
            </form>
        </div>
    );
};

export default Login;
