import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from './routes/myUserRoute'
import {v2 as cluidinary} from 'cloudinary'; // cloudinary de la version 2

// MongoDB Connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log('Connected to Mongo database!')
});

// Configuracion de cloudinary
cluidinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}); 


const app = express();
app.use(express.json()); // Middleware para convertir el body de cualqueir req a json
app.use(cors()); // CORS


// Ruta de prueba para ver si el server esta corriendo
app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "health OK !" });
}); 


app.use('/api/my/user', myUserRoute); // Toda request que vaya a '/api/my/user' se redirije a myUserRoute

app.listen(7000, ()=>{
    console.log(`Server started on http://localhost:7000`)
});