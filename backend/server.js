import dotenv from "dotenv"
import express from "express"
import cors from "cors" // Feature in web browser that controls how resources like APIs on one domain can be accessed by a webpage
import path from "path"
import { fileURLToPath } from "url" // coverts URL to a filepath
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { connectDB } from './config/db'

const app = express();


// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

app.use(express.json());

connectDB();

const PORT= process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))