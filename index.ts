import express, { Request, Response } from 'express';
import router from './src/routes';
import dotenv from 'dotenv'

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

