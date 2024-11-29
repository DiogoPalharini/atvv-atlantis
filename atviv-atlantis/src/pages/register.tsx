import React, { useState } from 'react';
import api from '../services/api'; // Importa a configuração do Axios
import '../styles/register.css';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        nome: '', // Ajustado para "nome" (de acordo com o backend)
        email: '',
        senha: '',
        confirmSenha: '', // Ajustado para "confirmSenha"
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validação básica
        if (formData.senha !== formData.confirmSenha) {
            setError('As senhas não coincidem!');
            return;
        }

        try {
            // Envia os dados para o backend
            await api.post('/register', {
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
            });

            setSuccess('Usuário cadastrado com sucesso!');
            setFormData({ nome: '', email: '', senha: '', confirmSenha: '' });
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erro ao cadastrar o usuário.');
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h1 className="register-title">Cadastrar-se</h1>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Digite seu nome"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Digite seu e-mail"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        placeholder="Digite sua senha"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmSenha">Confirme a Senha</label>
                    <input
                        type="password"
                        id="confirmSenha"
                        name="confirmSenha"
                        value={formData.confirmSenha}
                        onChange={handleChange}
                        placeholder="Confirme sua senha"
                        required
                    />
                </div>
                <button type="submit" className="register-button">
                    Cadastrar
                </button>
            </form>
        </div>
    );
};

export default Register;
