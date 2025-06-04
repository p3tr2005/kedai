import { ProductCart, useCart } from "@/lib/hooks"
import { cn, formatPrice } from "@/lib/utils"
import { Minus, PackageOpen, Plus, X } from "lucide-react"

import { Button } from "@/ui/components/button"
import { Separator } from "@/ui/components/separator"

function CartPage() {
  const products = useCart((state) => state.products)

  const dispatchQuantity = useCart((state) => state.dispatchQuantity)
  const removeProduct = useCart((state) => state.removeProduct)

  const onPressedConfirmPayment = (products: ProductCart[]) => {

  }

  return (
    <main className={cn("w-screen pb-20 px-8 bg-zinc-100", products.length !== 0 ? "h-screen" : "h-screen")}>
      <section className="flex flex-col gap-4 my-4">
        <h1 className="text-5xl uppercase font-bold">Shooping Cart</h1>

        {products.length !== 0 && <p className="font-light"><b>{products.length}</b> items in your cart!</p>}
      </section>

      <Separator className="bg-zinc-200" />

      <section className={cn("w-full h-max flex justify-between bg-white p-8 rounded-lg", products.length === 0 && "h-full")}>
        {!products.length ? <div className="w-full text-center text-2xl mt-8 flex flex-col items-center gap-8">
          <h1 className=" uppercase text-zinc-400">There&apos;s no item yet!</h1>
          <PackageOpen size={70} className="text-zinc-600" />
        </div> :
          <>
            <section className="w-[70%] h-full border-black rounded-lg flex flex-col gap-4  bg-zinc-100">
              {products.map((product) => (
                <section key={product.id} className="w-full h-max relative p-2 pb-8 flex items-center gap-8 border-b-1 border-black">
                  <Button className="absolute top-[1rem] right-[1rem]" onClick={() => removeProduct(product.id)} variant="ghost">
                    <X />
                  </Button>
                  <div className="w-[200px] h-[200px]  bg-white p-4 rounded-xl flex items-center justify-center">
                    <img className="" src={product.imageUrl} alt={product.title} width={200} height={200} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="uppercase text-2xl font-semibold">{product.title}</p>
                    <p className="font-light">{formatPrice(product.price)}</p>

                    <div className="flex items-center gap-8 mt-8 border-1 border-black">
                      <Button className="w-28 " variant="ghost" onClick={() => dispatchQuantity(product.id, "ADD")} disabled={product.quantity === 5}>
                        <Plus size={50} />
                      </Button>

                      <p className="selection:bg-transparent text-lg">{product.quantity}</p>

                      <Button className="w-28" variant="ghost" size="lg" onClick={() => dispatchQuantity(product.id, "REMOVE")} disabled={product.quantity === 1}>
                        <Minus size={50} />
                      </Button>
                    </div>
                  </div>
                </section>
              ))}
            </section>
            <section className="w-[25%] h-full bg-zinc-100 rounded-lg p-6 flex flex-col justify-between gap-4">
              <h1 className="uppercase text-2xl font-light">Order Summary</h1>

              <div className="mt-3 flex items-center justify-between">
                <h1 className="font-light text-zinc-600">TOTAL</h1>
                <p className="font-bold">{formatPrice(products.reduce((total, product) => total + product.originalPrice * product.quantity, 0))}</p>
              </div>

              <Button onClick={() => onPressedConfirmPayment(products)} className="rounded-none w-full p-8 text-xl mt-8">Checkout</Button>
            </section>
          </>
        }
      </section>
    </main >
  )
}

export default CartPage
