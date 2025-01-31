import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from './routes/myUserRoute'

// MongoDB Connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log('Connected to Mongo database!')
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