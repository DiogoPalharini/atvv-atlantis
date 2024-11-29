import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './database';
import { criarUsuario, autenticarUsuario } from './auth';

const app = express();

// Middleware CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // URL do front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Middleware Body Parser
app.use(bodyParser.json());

/* ========== Rotas de Usuários ========== */

// Rota para criar um novo usuário
app.post('/register', async (req: Request, res: Response) => {
  const { nome, email, senha, tipo } = req.body;

  try {
    await criarUsuario(nome, email, senha, tipo || 'cliente');
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Rota para login
app.post('/login', async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const resultado = await autenticarUsuario(email, senha);
    res.status(200).json(resultado);
  } catch (error: any) {
    console.error('Erro ao autenticar usuário:', error.message);
    res.status(401).json({ error: error.message });
  }
});

/* ========== Rotas de Acomodações ========== */

// Criar uma nova acomodação
app.post('/acomodacoes', async (req: Request, res: Response) => {
  const { nome, descricao, preco, capacidade, tipo } = req.body;

  try {
    const [result]: any = await db.query(
      'INSERT INTO acomodacoes (nome, descricao, preco, capacidade, tipo) VALUES (?, ?, ?, ?, ?)',
      [nome, descricao, preco, capacidade, tipo]
    );
    res.status(201).json({ message: 'Acomodação criada com sucesso!', id: result.insertId });
  } catch (error: any) {
    console.error('Erro ao criar acomodação:', error.message);
    res.status(500).json({ error: 'Erro ao criar acomodação.' });
  }
});

// Editar uma acomodação existente
app.put('/acomodacoes/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nome, descricao, preco, capacidade, tipo } = req.body;

    console.log('Recebendo dados para edição:', { id, nome, descricao, preco, capacidade, tipo });

    try {
        const [result]: any = await db.query(
            'UPDATE acomodacoes SET nome = ?, descricao = ?, preco = ?, capacidade = ?, tipo = ? WHERE id = ?',
            [nome, descricao, preco, capacidade, tipo, id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Acomodação não encontrada.' });
            return;
        }

        res.status(200).json({ message: 'Acomodação atualizada com sucesso!' });
    } catch (error: any) {
        console.error('Erro ao atualizar acomodação:', error.message);
        res.status(500).json({ error: 'Erro ao atualizar acomodação.' });
    }
});

// Deletar uma acomodação
app.delete('/acomodacoes/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const [result]: any = await db.query('DELETE FROM acomodacoes WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Acomodação não encontrada.' });
            return;
        }

        res.status(200).json({ message: 'Acomodação deletada com sucesso!' });
    } catch (error: any) {
        console.error('Erro ao deletar acomodação:', error.message);
        res.status(500).json({ error: 'Erro ao deletar acomodação.' });
    }
});


// Listar todas as acomodações
app.get('/acomodacoes', async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query('SELECT * FROM acomodacoes');
    res.status(200).json(rows);
  } catch (error: any) {
    console.error('Erro ao listar acomodações:', error.message);
    res.status(500).json({ error: 'Erro ao listar acomodações.' });
  }
});

/* ========== Rotas de Hospedagem ========== */

// Criar uma solicitação de hospedagem
app.post('/hospedagens', async (req: Request, res: Response) => {
  const { acomodacao_id, usuario_id, data_hospedagem } = req.body;

  try {
    const [result]: any = await db.query(
      'INSERT INTO hospedagens (acomodacao_id, usuario_id, data_hospedagem) VALUES (?, ?, ?)',
      [acomodacao_id, usuario_id, data_hospedagem]
    );
    res.status(201).json({ message: 'Solicitação de hospedagem criada com sucesso!', id: result.insertId });
  } catch (error: any) {
    console.error('Erro ao criar solicitação de hospedagem:', error.message);
    res.status(500).json({ error: 'Erro ao criar solicitação de hospedagem.' });
  }
});

// Listar todas as solicitações de hospedagem
app.get('/hospedagens', async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query('SELECT * FROM hospedagens');
    res.status(200).json(rows);
  } catch (error: any) {
    console.error('Erro ao listar hospedagens:', error.message);
    res.status(500).json({ error: 'Erro ao listar hospedagens.' });
  }
});

// Atualizar o status de uma solicitação de hospedagem
app.put('/hospedagens/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const [result]: any = await db.query('UPDATE hospedagens SET status = ? WHERE id = ?', [status, id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Solicitação de hospedagem não encontrada.' });
            return;
        }

        res.status(200).json({ message: 'Status de hospedagem atualizado com sucesso!' });
    } catch (error: any) {
        console.error('Erro ao atualizar hospedagem:', error.message);
        res.status(500).json({ error: 'Erro ao atualizar hospedagem.' });
    }
});

app.post('/reservas', async (req: Request, res: Response): Promise<void> => {
    const { acomodacao_id, usuario_id, data_reserva } = req.body;

    try {
        const [result]: any = await db.query(
            'INSERT INTO reservas (acomodacao_id, usuario_id, data_reserva, status) VALUES (?, ?, ?, ?)',
            [acomodacao_id, usuario_id, data_reserva, 'pendente']
        );
        res.status(201).json({ message: 'Reserva solicitada com sucesso!', id: result.insertId });
    } catch (error: any) {
        console.error('Erro ao criar solicitação de reserva:', error.message);
        res.status(500).json({ error: 'Erro ao criar solicitação de reserva.' });
    }
});

app.get('/reservas', async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows]: any = await db.query(
            `SELECT r.id, r.data_reserva, r.status, u.nome AS usuario_nome, a.nome AS acomodacao_nome 
                FROM reservas r 
                JOIN usuarios u ON r.usuario_id = u.id 
                JOIN acomodacoes a ON r.acomodacao_id = a.id`
        );
        res.status(200).json(rows);
    } catch (error: any) {
        console.error('Erro ao listar solicitações de reserva:', error.message);
        res.status(500).json({ error: 'Erro ao listar solicitações de reserva.' });
    }
});

app.put('/reservas/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const [result]: any = await db.query('UPDATE reservas SET status = ? WHERE id = ?', [status, id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Solicitação de reserva não encontrada.' });
            return;
        }

        res.status(200).json({ message: `Reserva ${status === 'aceita' ? 'aceita' : 'negada'} com sucesso!` });
    } catch (error: any) {
        console.error('Erro ao atualizar status de reserva:', error.message);
        res.status(500).json({ error: 'Erro ao atualizar status de reserva.' });
    }
});



export default app;
