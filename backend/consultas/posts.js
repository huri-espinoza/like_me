const pool = require("../db/conexion");

const getPosts = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM posts ORDER BY id DESC"
  );
  return rows;
};

const crearPost = async (titulo, url, descripcion) => {
  const consulta = `
    INSERT INTO posts (titulo, img, descripcion, likes)
    VALUES ($1, $2, $3, 0)`;

  const values = [titulo, url, descripcion];

  const { rows } = await pool.query(consulta, values);

  return rows[0];
};

module.exports = { getPosts, crearPost };