import { create } from "zustand"
import { Product } from "./schemas"

export type ProductCart = {
    quantity: number;
    originalPrice: number;
} & Product

export type CartStore = {
    products: Array<ProductCart>,
    addProduct: (product: ProductCart) => void,
    removeProduct: (id: string) => void,
    dispatchQuantity: (id: string, type: "ADD" | "REMOVE") => void,
}

const dispatchQuantityOnProductCart = (products: Array<ProductCart>, id: string, type: "ADD" | "REMOVE"): Array<ProductCart> => {
    const updated = products.map((product) => {
        if (product.id === id) {
            switch (type) {
                case "ADD":
                    product.quantity !== 5 ? product.quantity++ : product.quantity
                    product.price = product.originalPrice * product.quantity
                    return product
                case "REMOVE":
                    product.quantity !== 1 ? product.quantity-- : product.quantity
                    product.price -= product.originalPrice
                    return product
            }
        } else {
            return product
        }
    })

    return updated
}

export const useCart = create<CartStore>()((set) => ({
    products: [],
    addProduct: (product: ProductCart) => set((state) => ({ products: [...state.products, product] })),
    removeProduct: (id: string) => set((state) => ({ ...state, products: state.products.filter((product) => product.id !== id) })),
    dispatchQuantity: (id: string, type: "ADD" | "REMOVE") => set((state) => ({ ...state, products: dispatchQuantityOnProductCart(state.products, id, type) }))
}))

