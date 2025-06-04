import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { useParams } from "react-router";
import { toast } from "sonner";

import { formatPrice } from "@/lib/utils";

import { useCart } from "@/lib/hooks";
import { Product } from "@/lib/schemas";
import { Button } from "@/ui/components/button";
import { Separator } from "@/ui/components/separator";

const getProductById = async (id: string) => {
  try {
    const resp = await fetch(`http://localhost:3001/products/${id}`);

    const data = await resp.json();

    return data.product as Product | undefined;
  } catch (error) {
    console.log("[ERROR] :", error);
    return null;
  }
};

function DetailPage() {
  const params = useParams<{ id: string }>();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductById(params.id as string),
  });
  
  if (isLoading) {
    return <h1>LOADING...</h1>
  }

  const [quantity, setQuantity] = useState(1);
  const [trackedPrice, setTrackPrice] = useState(product?.price || 0);
  const addToCart = useCart((state) => state.addProduct);

  useEffect(() => {
    if (product?.price) {
      setTrackPrice(product.price * quantity);
    }
  }, [quantity, setTrackPrice]);

  const addProductToCart = (product: Product) => {
    toast.success("Product added!");

    addToCart({ ...product, quantity, price : trackedPrice, originalPrice: product.price });
  };

  const dispatchQuantity = (type: "ADD" | "REMOVE") => {
    setQuantity((quantity) => {
      switch (type) {
        case "ADD":
          return quantity !== 5 ? quantity + 1 : quantity;
        case "REMOVE":
          return quantity !== 1 ? quantity - 1 : quantity;
      }
    });
  };

  return (
    <main className="w-screen h-full px-8 mt-10 bg-zinc-100">
        <section className="flex h-[800px] items-start gap-8">
          <nav className="w-[800px] h-full bg-white rounded-xl p-4 flex items-center justify-center">
            <img
              className="w-[900px] h-[900px] object-contain"
              src={product?.imageUrl}
              alt={product?.title}
              width={600}
              height={800}
            />
          </nav>

          <section className="w-full h-full flex flex-col justify-between gap-3">
            <div className="w-full flex flex-col gap-3">
              <h1 className="text-7xl font-semibold">{product?.title}</h1>
              <Separator />
              <h1 className="font-semibold">DESCRIPTION</h1>
              <p className="text-md text-zinc-700">{product?.description}</p>

              <p className="text-xl font-bold">
                {formatPrice(trackedPrice as number)}
              </p>
            </div>

            <section className="w-full flex items-center justify-around">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => addProductToCart(product!)}
                  size="lg"
                  variant="outline"
                  className="w-80 capitalize text-lg font-normal p-9 rounded-full"
                >
                  Add to cart
                </Button>
                <Button
                  size="lg"
                  className="w-80 capitalize text-lg font-normal p-9 rounded-full"
                >
                  Buy now
                </Button>
              </div>
              <div className="flex items-center gap-8  w-max border-1 rounded-full border-black">
                <Button
                  className="w-28 rounded-full"
                  variant="ghost"
                  size="lg"
                  onClick={() => dispatchQuantity("ADD")}
                  disabled={quantity === 5}
                >
                  <Plus size={50} />
                </Button>

                <p className="selection:bg-transparent text-lg">{quantity}</p>

                <Button
                  className="w-28 p-8 rounded-full"
                  size="lg"
                  variant="ghost"
                  onClick={() => dispatchQuantity("REMOVE")}
                  disabled={quantity === 1}
                >
                  <Minus size={50} />
                </Button>
              </div>
            </section>
          </section>
        </section>
    </main>
  );
}

export default DetailPage;
