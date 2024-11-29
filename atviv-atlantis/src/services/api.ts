import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // URL do seu back-end
    timeout: 10000, // Tempo máximo para a requisição (10 segundos)
    headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo padrão
    },
});

export default api;
