import express from 'express';
import auth_routes from  '../token_node/routes/auth_routes.js';

const app = express();
app.use(express.json());

app.use("/auth", auth_routes);

const PORT = 3000;
app.listen(PORT, () => console.log (`Servidor rodando na porta ${PORT}`))