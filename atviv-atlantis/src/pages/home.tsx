import React from 'react';
import '../styles/home.css';
import homeImage from '../images/home.webp';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleButtonClick = () => {
    if (user) {
      navigate('/accommodations');
    } else {
      alert('Você precisa estar logado para acessar as acomodações.');
      navigate('/login');
    }
  };

  return (
    <div>
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Bem-vindo ao Atlantis</h1>
          <p className="hero-subtitle">
            Gerencie clientes, acomodações e hospedagens de forma eficiente e prática.
          </p>
        </div>
        <div className="hero-image">
          <img src={homeImage} alt="Imagem representando Atlantis" className="home-image" />
        </div>
        <div className="hero-button-container">
          <button className="hero-button" onClick={handleButtonClick}>
            Ver Acomodações
          </button>
        </div>
      </header>
    </div>
  );
};

export default Home;
