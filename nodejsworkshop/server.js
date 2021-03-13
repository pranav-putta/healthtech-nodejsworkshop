const express = require("express");
const cors = require("cors");
const path = require("path");

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

async function setup() {
  console.log("Setting up database");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  let collections = await admin.firestore().listCollections();
  if (collections.length == 0) {
    for (let i = 0; i < pokemon.length; i++) {
      await admin.firestore().collection("pokemon").add(pokemon[i]);
    }
  }

  console.log("Finished setting up");
}
setup();

const app = express();
const port = 3000;

// ROOT
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// GET search
app.get("/search", async (req, res) => {
  const name = req.query.name;
  const pokemonCollection = admin.firestore().collection("pokemon");
  const snapshot = await pokemonCollection
    .where("name.english", "==", name)
    .get();
  let pokemon = [];
  pokemon = snapshot.docs.map((doc) => doc.data());

  res.send(pokemon);
});

// GET pokemon search by id
app.get("/pokemon/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const pokemonCollection = admin.firestore().collection("pokemon");
  const snapshot = await pokemonCollection.where("id", "==", id).get();
  let pokemon = [];
  pokemon = snapshot.docs.map((doc) => doc.data());
  res.send(pokemon);
});

app.post("/new", async (req, res) => {
  await admin.firestore().collection("pokemon").add(req.body);
  res.send("successfully added pokemon")
});

app.listen(port, () => {
  console.log(`App Listening at http://localhost:${port}`);
});
