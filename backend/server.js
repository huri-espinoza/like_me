const express = require("express");
const cors = require("cors");

const { getPosts, crearPost } = require("./consultas/posts");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener posts");
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;

    const nuevoPost = await crearPost(titulo, url, descripcion);

    res.status(201).json(nuevoPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear post");
  }
});

app.listen(3000, () => {
  console.log("Servidor backend en http://localhost:3000");
});