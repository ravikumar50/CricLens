import express from 'express';
import cors from 'cors';
import { searchPlayer } from './controllers/playerController.js';
import Player from './models/Player.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/players/search', searchPlayer);

app.get("/api/players/suggest", async (req, res) => {
  try {
    const name = req.query.name;

    const players = await Player.find({
      name: { $regex: name, $options: "i" }
    });

    res.json(players.map(p => ({
      id: p.id,
      name: p.name
    })));
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


export default app;