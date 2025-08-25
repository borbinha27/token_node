import {Router} from 'express';
import jwt  from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import authMiddleware from '../middleware/auth_middleware.js';

const router = Router();

//memória
const users = [];

//rota registro
router.post("/register", async (req, res) =>{
    const {username, password} = req.body;

    const userExist = users.find((u) => u.username === username);
    if(userExist) return res.status(400).json({message:"Usuário já existe"});
    
    const hashePassowrd = await bcrypt.hash(password, 10);
    users.push((username, password.hashePassowrd));
    res.json({message:"Usuário registrado com sucesso"})
})

//rota de login
router.post("/login", async (req, res) =>{
    const {username, password} = req.body;

    const userExist = users.find((u) => u.username === username);
    if(!users) return res.status(400).json({message:"Usuário não encontrado"});
    
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if(!isPasswordValid) return res.status(400).json({message:"Senha inválida"}) 

    const token = jwt.sign((username) , 'secreta123', {expiresIn:'1h'})
    res.json({token})
})

export default router;