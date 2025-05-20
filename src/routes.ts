import express, {Application, Router} from 'express'
import { ErrosHandleMiddlewares } from './middlewares/ErrorsHandleMiddlewares';
import cors from 'cors';
import userRoutes from '../src/routes/UserRoutes';
import postRoutes from '../src/routes/PostRoutes';
import authRoutes from '../src/routes/AuthRoutes';

const createServer = (): Application => {
   const app = express();

    app.use(express.json());
    
    app.use(cors({}));
    
    // Adicionando rotas de usuário
    app.use('/api', userRoutes);

    // Rota de autenticacao
    app.use('/api/auth',  authRoutes); 

    // Rota de posts
    app.use('/api', postRoutes);

    app.use(ErrosHandleMiddlewares);

    return app;

}

export default createServer;