const express = require("express");
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
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded());
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// GET search
app.get("/search", async (req, res) => {
  // CODE HEREE!!
});

// GET pokemon search by id
app.get("/pokemon/:id", async (req, res) => {
  // CODE HEREE!!
});

// POST request add new pokemon
app.post("/new", async (req, res) => {
  // CODE HEREE!!
});

app.listen(port, () => {
  console.log(`App Listening at http://localhost:${port}`);
});
