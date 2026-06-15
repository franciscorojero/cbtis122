import express from "express";
import cors from "cors";

import alumnosRoutes from "./routes/alumnosRoutes.js";
import registrosRoutes from "./routes/registrosRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('CBTis 122 API');
});

app.get("/api", (req, res) => {
    res.send("API funcionando");
});
app.use("/api/alumnos", alumnosRoutes);
app.use("/api/registros", registrosRoutes);

export default app;