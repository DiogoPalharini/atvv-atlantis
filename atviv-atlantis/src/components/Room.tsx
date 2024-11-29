import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface RoomProps {
    id: number;
    name: string;
    description: string;
    price: number | string | null; // Aceita string ou null para casos temporários
    capacity: number;
    type: string;
}

const Room: React.FC<RoomProps> = ({ id, name, description, price, capacity, type }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleBook = async () => {
        if (!user) {
            alert('Você precisa estar logado para reservar um quarto.');
            navigate('/login');
            return;
        }

        try {
            await api.post('/reservas', {
                acomodacao_id: id,
                usuario_id: user.id,
                data_reserva: new Date().toISOString().split('T')[0], // Data atual no formato YYYY-MM-DD
            });
            alert('Reserva solicitada com sucesso!');
        } catch (error: any) {
            console.error('Erro ao solicitar reserva:', error.message);
            alert('Erro ao solicitar reserva.');
        }
    };

    const handleEdit = () => {
        navigate(`/acomodacoes/editar/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm(`Tem certeza que deseja excluir a acomodação "${name}"?`)) {
            try {
                await api.delete(`/acomodacoes/${id}`);
                alert('Acomodação excluída com sucesso!');
                window.location.reload(); // Atualiza a página para refletir as alterações
            } catch (error: any) {
                console.error('Erro ao excluir acomodação:', error.message);
                alert('Erro ao excluir acomodação.');
            }
        }
    };

    return (
        <div className="room-card">
            <div className="room-info">
                <h3 className="room-name">{name}</h3>
                <p className="room-description">{description}</p>
                <p className="room-details">
                    Tipo: {type} | Capacidade: {capacity} pessoas | Preço:{' '}
                    {typeof price === 'number' ? `R$ ${price.toFixed(2)}` : 'Indisponível'}
                </p>
                <div className="room-actions">
                    {/* Botão de reserva para clientes */}
                    {user?.tipo !== 'admin' && (
                        <button className="room-button" onClick={handleBook}>
                            Hospede-se
                        </button>
                    )}
                    {/* Botões de edição e exclusão para administradores */}
                    {user?.tipo === 'admin' && (
                        <>
                            <button className="room-button edit" onClick={handleEdit}>
                                Editar
                            </button>
                            <button className="room-button delete" onClick={handleDelete}>
                                Excluir
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Room;
