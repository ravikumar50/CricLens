import express from 'express';
import cors from 'cors';
import { searchPlayer } from './controllers/playerController.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/players/search', searchPlayer);

export default app;