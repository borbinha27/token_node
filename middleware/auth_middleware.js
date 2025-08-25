import jwt  from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token malformado.' });
  }

  try {
    const decode = jwt.verify(token, "secreta123");
    req.user = decode; 
    next(); 
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};

export default authMiddleware;