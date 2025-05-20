import express, { Request, Response } from 'express';
import router from './src/routes';
import dotenv from 'dotenv'
import { ErrosHandleMiddlewares } from './src/middlewares/ErrorsHandleMiddlewares';
import cors from 'cors';

dotenv.config();



const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors({}));

app.use('/api', router);

app.use(ErrosHandleMiddlewares);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;