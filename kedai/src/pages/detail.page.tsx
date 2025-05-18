import { productSchema } from "@/lib/schemas"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/ui/components/button"
import { Separator } from "@/ui/components/separator"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { object, safeParse } from "valibot"

const getProductById = async (id: string) => {
    try {
        const resp = await fetch(`http://localhost:3001/products/${id}`)

        const data = await resp.json()

        // const schema = object({
        //     product: productSchema
        // })

        // const { success, output } = safeParse(schema, data)

        // if (!success) {
        //     console.log("[ERROR] : PRODUCT EMPTY!")
        //     return null;
        // }

        return data.product
    } catch (error) {
        console.log("[ERROR] :", error)
        return null;
    }
}

function DetailPage() {
    const params = useParams<{ id: string }>()

    const { data: product, isLoading } = useQuery({
        queryKey: ["product"],
        queryFn: () => getProductById(params.id as string)
    })


    return (
        <main className="w-screen h-screen px-8 mt-10 bg-zinc-100">
            {isLoading ? <h1>LOADING...</h1> :
                <section className="flex h-[800px] items-start gap-8">
                    <nav className="w-[800px] h-full bg-white rounded-xl p-4 flex items-center justify-center">
                        <img className="w-[900px] h-[900px] object-contain" src={product?.imageUrl} alt={product?.title} width={600} height={800} />
                    </nav>

                    <div className="w-full h-full flex flex-col justify-between gap-3">
                        <div className="w-full flex flex-col gap-3">
                            <h1 className="text-7xl font-semibold">{product?.title}</h1>
                            <Separator />
                            <h1 className="font-semibold">DESCRIPTION</h1>
                            <p className="text-md text-zinc-700">{product?.description}</p>

                            <p className="text-xl font-bold">{formatPrice(product?.price as number)}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button size="lg" variant="outline" className="w-80 capitalize text-lg font-normal p-9 rounded-full">Add to cart</Button>
                            <Button size="lg" className="w-80 capitalize text-lg font-normal p-9 rounded-full">Buy now</Button>
                        </div>
                    </div>
                </section>
            }
        </main>
    )
}

export default DetailPage