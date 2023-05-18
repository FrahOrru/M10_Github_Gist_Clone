import express from 'express';

const app: express.Express = express();
const port: number = 3000;

app.use(express.json());

import { Request, Response } from 'express';

app.get('/api/notes', (req: Request, res: Response) => {

  const notes = [
    { id: 1, title: 'Note 1', content: 'This is note 1' },
    { id: 2, title: 'Note 2', content: 'This is note 2' },
  ];
  res.json(notes);
});

app.post('/api/notes', (req: Request, res: Response) => {

  const { title, content } = req.body;

  const newNote = { id: 3, title, content };

  res.status(201).json(newNote);
});

app.put('/api/notes/:id', (req: Request, res: Response) => {

  const { id } = req.params;

  const { title, content } = req.body;

  const updatedNote = { id, title, content };

  res.json(updatedNote);
});

app.delete('/api/notes/:id', (req: Request, res: Response) => {

  const { id } = req.params;

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});