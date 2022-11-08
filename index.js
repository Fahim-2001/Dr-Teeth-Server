const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Initial Message
app.get("/", (req, res) => {
  res.send("Welcome to Dr.Teeth server!");
});

app.listen(port, () => {
  console.log(`Dr. Teeth server running in localhost:${port}`);
});
