import 'tsconfig-paths/register';
import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import apiRoutes from '@/infrastructure/api/routes';

dotenv.config();  // Load environment variables

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // Parse JSON request bodies

/**
 * Headers configuration
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
    res.send('running...');
});

// Setup routes
app.use('/api/v1', apiRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
