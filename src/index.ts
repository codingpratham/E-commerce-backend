import "dotenv/config"
import express from 'express'
import indexRoutes from './routes/index'
import cookieParser from 'cookie-parser'


const app = express()
const PORT = process.env.PORT || 3000
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('photos'))
app.use('/api',indexRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})