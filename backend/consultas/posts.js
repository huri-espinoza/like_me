const pool = require("../db/conexion");

// OBTENER POSTS
const getPosts = async () => {
  const consulta = "SELECT * FROM posts ORDER BY id DESC";

  const { rows } = await pool.query(consulta);

  return rows;
};

// CREAR POST
const crearPost = async (titulo, img, descripcion) => {
  const consulta = `
    INSERT INTO posts (titulo, img, descripcion, likes)
    VALUES ($1, $2, $3, 0)
  `;

  const values = [titulo, img, descripcion];

  const { rows } = await pool.query(consulta, values);

  return rows[0];
};

// DAR LIKE
const likePost = async (id) => {
  const consulta = `
    UPDATE posts
    SET likes = likes + 1
    WHERE id = $1
  `;

  const values = [id];

  const { rows } = await pool.query(consulta, values);

  return rows[0];
};

// ELIMINAR POST
const eliminarPost = async (id) => {
  const consulta = `
    DELETE FROM posts
    WHERE id = $1
  `;

  const values = [id];

  const { rows } = await pool.query(consulta, values);

  return rows[0];
};

module.exports = {
  getPosts,
  crearPost,
  likePost,
  eliminarPost,
};