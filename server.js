import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import morgan from "morgan"
import connectDb from "./config/db.js"
// Routes Import
import authRoutes from "./routes/authRoutes.js"
import dataRoutes from "./routes/dataRoutes.js"
dotenv.config()

connectDb();
const app = express()
app.use(express.json())
app.use(cors());
app.use(morgan("dev"))

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/data",dataRoutes)
app.listen(8080,()=>{
    console.log("node server running")
})