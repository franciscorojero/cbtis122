import pool from "../config/db.js";

export const registrarAcceso = async (req, res) => {

    try {

        const { ncontrol } = req.body;

        const alumno = await pool.query(
            "SELECT * FROM alumnos WHERE ncontrol=$1",
            [ncontrol]
        );

        if(alumno.rows.length === 0){

            return res.status(404).json({
                mensaje: "Alumno no encontrado"
            });

        }

        const alumnoId = alumno.rows[0].id;

        const ultimoRegistro = await pool.query(
            `
            SELECT *
            FROM registros
            WHERE idalumno=$1
            ORDER BY fecha_hora DESC
            LIMIT 1
            `,
            [alumnoId]
        );

        let tipo = "ENTRADA";

        if(
            ultimoRegistro.rows.length > 0 &&
            ultimoRegistro.rows[0].tipo === "ENTRADA"
        ){
            tipo = "SALIDA";
        }

        const registro = await pool.query(
            `
            INSERT INTO registros
            (idalumno,tipo)
            VALUES($1,$2)
            RETURNING *
            `,
            [alumnoId, tipo]
        );

        res.json({
            mensaje: `${tipo} registrada`,
            registro: registro.rows[0]
        });

    } catch(error) {

        res.status(500).json({
            mensaje: error.message
        });

    }
};

export const obtenerRegistros = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                r.id,
                a.ncontrol,
                a.nombre,
                a.correo,
                a.celular,
                r.tipo,
                r.fecha_hora
            FROM registros r
            INNER JOIN alumnos a
                ON a.id = r.idalumno
            ORDER BY r.fecha_hora DESC
        `);

        res.json(result.rows);

    } catch(error) {

        res.status(500).json({
            mensaje: error.message
        });

    }
};