# Atlantis Hotel Management System

## Descrição do Projeto

**Atlantis** é um sistema completo de gerenciamento de hotéis. Ele permite que administradores gerenciem acomodações e reservas, enquanto clientes podem explorar acomodações, solicitar hospedagens e gerenciar seus próprios dados. O projeto é dividido em **front-end** e **back-end**, com ambas as partes integradas para fornecer uma experiência completa.

---

## Funcionalidades

### **Clientes**
- Visualizar lista de acomodações.
- Solicitar reserva de acomodações.
- Autenticação e registro de conta.

### **Administradores**
- Criar, editar e deletar acomodações.
- Gerenciar solicitações de reserva.
- Listar todas as acomodações e reservas.

---

## Tecnologias Utilizadas

### **Front-End**
- **React** com TypeScript
- **React Router** para navegação
- **Axios** para integração com API
- **CSS** estilizado para uma interface moderna e responsiva

### **Back-End**
- **Node.js** com TypeScript
- **Express** para gerenciamento de rotas
- **MySQL** como banco de dados relacional
- **JWT (JSON Web Token)** para autenticação
- **bcrypt** para hash de senhas

---

## Estrutura do Projeto

```plaintext
atvv-atlantis/
├── atviv-atlantis/   # Front-End do Projeto
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── back/             # Back-End do Projeto
│   ├── src/
│   ├── dist/
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
```
## Como Rodar o Projeto

### **Pré-Requisitos**
Certifique-se de ter instalado:
- **Node.js** (versão 16 ou superior)
- **MySQL** (configurado e rodando)
- **Git**

---

### **Passo 1: Clonar o Repositório**
```bash
git clone https://github.com/DiogoPalharini/atvv-atlantis.git
cd atvv-atlantis
```
### **Passo 2: Configurar o Banco de Dados**
1. Crie um banco de dados MySQL chamado `atlantis`:
   ```sql
   CREATE DATABASE atlantis;
   
Execute o script SQL para criar as tabelas necessárias. Abaixo está um exemplo do esquema do banco:

```sql
-- Criação do Banco de Dados
CREATE DATABASE atlantis_hotel;
USE atlantis_hotel;

-- Tabela de Usuários
CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('admin', 'cliente') DEFAULT 'cliente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Acomodações
CREATE TABLE acomodacoes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    capacidade INT NOT NULL,
    tipo ENUM('suíte', 'quarto_standard', 'chalé') DEFAULT 'quarto_standard',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Solicitações de Reservas
CREATE TABLE solicitacoes_reservas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    acomodacao_id BIGINT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    status ENUM('pendente', 'aprovado', 'rejeitado') DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (acomodacao_id) REFERENCES acomodacoes(id)
);

-- Tabela de Reservas
CREATE TABLE reservas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    solicitacao_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    acomodacao_id BIGINT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (solicitacao_id) REFERENCES solicitacoes_reservas(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (acomodacao_id) REFERENCES acomodacoes(id)
);

-- Inserindo Dados de Exemplo na Tabela de Usuários
INSERT INTO usuarios (nome, email, senha, tipo) VALUES
('Admin Master', 'admin@atlantis.com', 'senhaAdmin123', 'admin'),
('Cliente Exemplo', 'cliente@exemplo.com', 'senhaCliente123', 'cliente');

-- Inserindo Dados de Exemplo na Tabela de Acomodações
INSERT INTO acomodacoes (nome, descricao, preco, capacidade, tipo) VALUES
('Suíte Luxo', 'Uma suíte luxuosa com vista para o mar.', 500.00, 2, 'suíte'),
('Quarto Standard', 'Quarto confortável com cama queen-size.', 300.00, 2, 'quarto_standard'),
('Chalé Família', 'Chalé espaçoso para família.', 700.00, 5, 'chalé');

-- Inserindo Dados de Exemplo na Tabela de Solicitações de Reservas
INSERT INTO solicitacoes_reservas (usuario_id, acomodacao_id, data_inicio, data_fim, valor_total, status) VALUES
(2, 1, '2024-12-01', '2024-12-05', 2000.00, 'pendente'),
(2, 2, '2024-12-10', '2024-12-12', 600.00, 'pendente');

-- Inserindo Dados de Exemplo na Tabela de Reservas
INSERT INTO reservas (solicitacao_id, usuario_id, acomodacao_id, data_inicio, data_fim, valor_total) VALUES
(1, 2, 1, '2024-12-01', '2024-12-05', 2000.00);
```

### **Passo 3: Configurar o Back-End**
Navegue até a pasta back:
```bash
cd back
```
Instale as dependências:
```bash
npm install
```
Crie um arquivo .env na pasta back com as variáveis de ambiente:
```plaintext

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=atlantis
JWT_SECRET=sua_chave_secreta
```
Inicie o servidor do back-end:
```bash
npm start
```
### **Passo 4: Configurar o Front-End**
Navegue até a pasta atviv-atlantis:
```bash
cd ../atviv-atlantis
```
Instale as dependências:
```bash
npm install
```
Inicie o servidor do front-end:
```bash
npm run dev
```
### **Passo 5: Acessar o Sistema**
Abra o navegador e acesse: http://localhost:5173
