import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

//local import
import { connectDB } from './config/db.js'
import noteRoutes from './route/notes.route.js'
import { rateLimiter } from './middleware/rateLimiter.js'

dotenv.config()
const PORT = process.env.PORT || 5001
const app = express()
const __dirname = path.resolve()

if(process.env.NODE_ENV !== "production"){
    app.use(cors())
}

app.use(express.json())
app.use(rateLimiter)    
app.use("/api/notes", noteRoutes)

app.use(express.static(path.join(__dirname,"../frontend/dist")))

if(process.env.NODE_ENV === "production"){
    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"))
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started at http://localhost:" + PORT)
    })
})
