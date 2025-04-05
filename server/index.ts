import dotenv from "dotenv"
import express from "express"
import router from "@s/router"
import cors from "cors"
dotenv.config()

const app = express()

const PORT = process.env.PORT

app.use(cors({
  origin: ['http://localhost:5000'],
  credentials: true
}))

app.use('/', router)

app.listen(PORT, () => console.log(`СЕРВЕР ЗАПУЩЕН НА ПОРТУ: ${PORT}, НА САЙТЕ: ${process.env.URL_SERVER}`))