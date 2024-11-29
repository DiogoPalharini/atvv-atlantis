import React, { useEffect, useState } from 'react';
import Room from '../components/Room';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import '../styles/accommodations.css';

interface Accommodation {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    capacidade: number;
    tipo: string;
}

const Accommodations: React.FC = () => {
    const { user } = useAuth();
    const [rooms, setRooms] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await api.get('/acomodacoes');
                setRooms(response.data);
            } catch (error: any) {
                alert('Erro ao carregar acomodações.');
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const handleAddRoom = () => {
        window.location.href = '/acomodacoes/criar';
    };

    return (
        <div className="accommodations-container">
            <h1 className="accommodations-title">Acomodações</h1>
            {user?.tipo === 'admin' && (
                <button className="add-room-button" onClick={handleAddRoom}>
                    Adicionar Acomodação
                </button>
            )}
            {loading ? (
                <p>Carregando acomodações...</p>
            ) : (
                <div className="rooms-list">
                    {rooms.map((room) => (
                        <Room
                            key={room.id}
                            id={room.id}
                            name={room.nome}
                            description={room.descricao}
                            price={room.preco}
                            capacity={room.capacidade}
                            type={room.tipo}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Accommodations;
