import express from 'express';

const app: express.Express = express();
const port: number = 3000;

app.use(express.json());

// Define your API endpoints here

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});