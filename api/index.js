const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Define your API endpoints here

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});