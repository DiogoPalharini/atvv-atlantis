import { db } from './database';

// Listar todos os usuários
export const listarUsuarios = async () => {
    const [rows] = await db.query('SELECT * FROM usuarios');
    return rows;
};

// Inserir um novo usuário
export const criarUsuario = async (nome: string, email: string, senha: string, tipo: string = 'cliente') => {
    const [result] = await db.query(
    'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
    [nome, email, senha, tipo]
    );
    return result;
};
