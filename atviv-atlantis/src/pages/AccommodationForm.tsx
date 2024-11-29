import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/accommodationForm.css';

const AccommodationForm: React.FC<{ mode: 'create' | 'edit' }> = ({ mode }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: 0,
        capacidade: 0,
        tipo: 'quarto_standard',
    });

    useEffect(() => {
        if (mode === 'edit' && id) {
            const fetchAccommodation = async () => {
                try {
                    const response = await api.get(`/acomodacoes/${id}`);
                    setFormData(response.data);
                } catch (error: any) {
                    alert('Erro ao carregar acomodação.');
                    navigate('/accommodations');
                }
            };

            fetchAccommodation();
        }
    }, [mode, id, navigate]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'preco' || name === 'capacidade' ? Number(value) : value, // Converte para número se necessário
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const payload = {
            nome: formData.nome,
            descricao: formData.descricao,
            preco: parseFloat(formData.preco.toString()), // Converte para número
            capacidade: parseInt(formData.capacidade.toString(), 10), // Converte para inteiro
            tipo: formData.tipo || 'quarto_standard',
        };
    
        console.log('Dados enviados ao backend:', payload);
    
        try {
            if (mode === 'create') {
                await api.post('/acomodacoes', payload);
                alert('Acomodação criada com sucesso!');
            } else {
                await api.put(`/acomodacoes/${id}`, payload);
                alert('Acomodação atualizada com sucesso!');
            }
            navigate('/accommodations');
        } catch (error: any) {
            console.error('Erro ao salvar acomodação:', error.message);
            alert('Erro ao salvar acomodação.');
        }
    };
    

    return (
        <div className="accommodation-form-container">
            <form onSubmit={handleSubmit} className="accommodation-form">
                <h1>{mode === 'create' ? 'Criar Acomodação' : 'Editar Acomodação'}</h1>
                <div className="form-group">
                    <label>Nome</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Descrição</label>
                    <textarea
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Preço</label>
                    <input
                        type="number"
                        name="preco"
                        value={formData.preco}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Capacidade</label>
                    <input
                        type="number"
                        name="capacidade"
                        value={formData.capacidade}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Tipo</label>
                    <select
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        required
                    >
                        <option value="quarto_standard">Quarto Standard</option>
                        <option value="suíte">Suíte</option>
                        <option value="chalé">Chalé</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">
                    {mode === 'create' ? 'Criar' : 'Salvar Alterações'}
                </button>
            </form>
        </div>
    );
};

export default AccommodationForm;
