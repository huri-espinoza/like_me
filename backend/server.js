const express = require("express");
const cors = require("cors");

const {
  getPosts,
  crearPost,
  likePost,
  eliminarPost,
} = require("./consultas/posts");

const app = express();

app.use(cors());
app.use(express.json());

// GET POSTS
app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();

    res.json(posts);
  } catch (error) {
    console.error(error);

    res.status(500).send("Error al obtener posts");
  }
});

// CREAR POST
app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;

    const nuevoPost = await crearPost(
      titulo,
      url,
      descripcion
    );

    res.status(201).json(nuevoPost);
  } catch (error) {
    console.error(error);

    res.status(500).send("Error al crear post");
  }
});

// DAR LIKE
app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const post = await likePost(id);

    res.json(post);
  } catch (error) {
    console.error(error);

    res.status(500).send("Error al dar like");
  }
});

// ELIMINAR POST
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const post = await eliminarPost(id);

    res.json(post);
  } catch (error) {
    console.error(error);

    res.status(500).send("Error al eliminar post");
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});