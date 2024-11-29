import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
    children: React.ReactElement;
    adminOnly?: boolean; // Define se a rota é apenas para administradores
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, adminOnly = false }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user.tipo !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
