import { pool } from "../database/db.js";

export const ping = async (req, res) => {
  const [result] = await pool.query('SELECT "pong" as resultado ');
  res.json(result[0]);
}