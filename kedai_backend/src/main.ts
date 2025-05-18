import express, { type Request, type Response } from "express"
import cors from "cors"
import data from "./data.json"

const App = express();

App.use(cors())

App.get("/products", (_: Request, res: Response) => {
    const products = data

    setTimeout(() => {

        res.status(200).json({ products })
    }, 2000)
})

App.get("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id as string

    console.log({ id })

    const product = data.find((product) => product.id === id)
    console.log({ product })

    res.status(200).json({ product })
})

App.listen(3001, () => {
    console.log("APP RUNNING ON PORT 3001")
})