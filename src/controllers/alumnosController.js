import pool from "../config/db.js";

export const crearAlumno = async (req, res) => {
    try {
        const { ncontrol, nombre, correo, celular } = req.body;

        const query = `
            INSERT INTO alumnos
            (ncontrol,nombre,correo,celular)
            VALUES($1,$2,$3,$4)
            RETURNING *
        `;

        const values = [ncontrol, nombre, correo, celular];

        const result = await pool.query(query, values);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({
            mensaje: error.message,
        });
    }
};

export const obtenerAlumnos = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM alumnos ORDER BY ncontrol",
        );

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            mensaje: error.message,
        });
    }
};
