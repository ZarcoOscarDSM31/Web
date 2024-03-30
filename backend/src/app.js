import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from 'path';

import authRoutes from "./routes/auth.routes.js";
import sensorRoutes from "./routes/sensor.routes.js";
import { FRONTEND_URL } from "./config.js";

//SERVIDOR
const app = express();

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Algo está roto");
});

//CORS
app.use(
    cors({
        credentials: true,
        origin: FRONTEND_URL,
    })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//RUTAS
app.use("/api/auth", authRoutes);
app.use("/api/", sensorRoutes);


/* if (process.env.NODE_ENV === "production") {  // Si el entorno es producción, sirve archivos estáticos desde la carpeta "client/dist"
    app.use(express.static("client/dist"));  // Sirve archivos estáticos desde la carpeta "client/dist"
    app.get("*", (req, res) => {  // Maneja todas las demás rutas, devolviendo el archivo "index.html"
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));  // Resuelve la ruta absoluta al archivo "index.html" en la carpeta de distribución del cliente
    });
}
 */

export default app;