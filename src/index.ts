import dotenv from 'dotenv'
import createServer from './routes';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = createServer();

app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
});

