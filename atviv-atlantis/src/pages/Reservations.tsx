import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/reservations.css';

const Reservations: React.FC = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await api.get('/reservas');
                setReservations(response.data);
            } catch (error) {
                console.error('Erro ao carregar reservas:', error);
            }
        };

        fetchReservations();
    }, []);

    const handleUpdateStatus = async (id: number, status: string) => {
        try {
            await api.put(`/reservas/${id}`, { status });
            alert(`Reserva ${status === 'aceita' ? 'aceita' : 'negada'} com sucesso!`);
            setReservations((prev) => prev.filter((res: any) => res.id !== id)); // Atualiza a lista removendo a reserva atualizada
        } catch (error) {
            console.error('Erro ao atualizar status da reserva:', error);
            alert('Erro ao atualizar status da reserva.');
        }
    };

    return (
        <div className="reservations-container">
            <h1>Gerenciamento de Reservas</h1>
            <table className="reservations-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuário</th>
                        <th>Acomodação</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((res: any) => (
                        <tr key={res.id}>
                            <td>{res.id}</td>
                            <td>{res.usuario_nome}</td>
                            <td>{res.acomodacao_nome}</td>
                            <td>{res.data_reserva}</td>
                            <td>{res.status}</td>
                            <td>
                                {res.status === 'pendente' && (
                                    <>
                                        <button onClick={() => handleUpdateStatus(res.id, 'aceita')}>Aceitar</button>
                                        <button onClick={() => handleUpdateStatus(res.id, 'negada')}>Negar</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reservations;
