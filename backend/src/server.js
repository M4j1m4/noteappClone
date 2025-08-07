import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

//local import
import { connectDB } from './config/db.js'
import noteRoutes from './route/notes.route.js'
import { rateLimiter } from './middleware/rateLimiter.js'

dotenv.config()
const PORT = process.env.PORT || 5001
const app = express()


app.use(cors())
app.use(express.json())
app.use(rateLimiter)
app.use("/api/notes", noteRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started at http://localhost:" + PORT)
    })
})
