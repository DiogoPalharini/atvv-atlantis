import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Accommodations from './pages/accommodations';
import AccommodationForm from './pages/AccommodationForm';
import Reservations from './pages/Reservations'; // Importa a nova página de reservas
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/accommodations" element={<Accommodations />} />
                <Route
                    path="/acomodacoes/criar"
                    element={
                        <PrivateRoute adminOnly>
                            <AccommodationForm mode="create" />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/acomodacoes/editar/:id"
                    element={
                        <PrivateRoute adminOnly>
                            <AccommodationForm mode="edit" />
                        </PrivateRoute>
                    }
                />
                {/* Rota privada para gerenciamento de reservas */}
                <Route
                    path="/reservas"
                    element={
                        <PrivateRoute adminOnly>
                            <Reservations />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
