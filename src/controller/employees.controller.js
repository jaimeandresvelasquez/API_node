import { pool } from "../database/db.js";

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM company");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      massage: "Something goes wrong",
    });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM company WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0) {
      res.status(404).json({
        massage: "Employee noy found",
      });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      massage: "Something goes wrong",
    });
  }
};

export const createEmployee = async (req, res) => {
  try {
    console.log(req.body);
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO company (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      massage: "Something goes wrong",
    });
  }
};

export const borrarEmployee = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM company WHERE id=?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0) {
      res.status(404).json({
        massage: "Employee noy found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      massage: "Something goes wrong",
    });
  }
};

export const actualizarEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;
    const [result] = await pool.query(
      "UPDATE company SET name = IFNULL(?,name), salary = IFNULL(?,salary) WHERE id = ?",
      [name, salary, id]
    );
    console.log(result);
    if (result.affectedRows === 0) {
      res.status(404).json({
        massage: "Employee not found",
      });
    }
    const [rows] = await pool.query("SELECT * FROM company WHERE id = ?", [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      massage: "Something goes wrong",
    });
  }
};
