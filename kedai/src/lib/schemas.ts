import { array, InferOutput, number, object, string } from "valibot"

export const productSchema = object({
    id: string(),
    imageUrl: string(),
    title: string(),
    description: string(),
    price: number()
})

export const productsSchema = object({
    products: array(productSchema)
})

export type Product = InferOutput<typeof productSchema>
export type Products = InferOutput<typeof productsSchema>
