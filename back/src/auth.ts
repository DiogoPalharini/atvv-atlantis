import { db } from './database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'sua_chave_secreta_super_secreta'; // Substitua por uma chave forte em produção

// Função para criar um novo usuário
export const criarUsuario = async (nome: string, email: string, senha: string, tipo: string = 'cliente') => {
  const senhaHash = await bcrypt.hash(senha, 10); // Criptografa a senha
    const [result] = await db.query(
        'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
        [nome, email, senhaHash, tipo]
    );
    return result;
    };

    // Função para autenticar um usuário
    export const autenticarUsuario = async (email: string, senha: string) => {
    const [rows]: any = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length === 0) {
        throw new Error('Usuário não encontrado.');
    }

    const usuario = rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
        throw new Error('Credenciais inválidas.');
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email, tipo: usuario.tipo }, JWT_SECRET, {
        expiresIn: '1h', // Token válido por 1 hora
    });

    return {
        token,
        usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
        },
    };
};
