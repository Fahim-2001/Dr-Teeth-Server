const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
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

// Mongo Connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uue1axy.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client.db("dr-teeth").collection("services");

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = await serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/servicesforhome", async (req, res) => {
      const query = {};
      const cursor = await serviceCollection.find(query);
      const services = await cursor.limit(3).toArray();
      res.send(services);
    });
  } finally {
  }
}
run().catch((e) => console.log(e));
