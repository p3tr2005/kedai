import { Link } from "react-router";
import { safeParse } from "valibot";
import { useQuery } from "@tanstack/react-query";

import Card from "@/ui/components/card";
import { productsSchema } from "@/lib/schemas";
import CardLoading from "@/ui/components/card-loading";
import Navbar from "@/ui/components/navbar";

const getProducts = async () => {
  try {
    const resp = await fetch("http://localhost:3001/products");
    const data = await resp.json();

    const { output, success } = safeParse(productsSchema, data);

    if (!success) {
      console.log("[ERROR] : data is empty!");

      return [];
    }

    return output.products;
  } catch (error) {
    console.log("[ERROR] :", error);
    return [];
  }
};

function HomePage() {
  const {
    data: products,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <main className="px-8">
      <Navbar />

      <section className="flex flex-col gap-2 mt-4">
        <div className="flex item-center justify-between px-3">
          <h1 className="text-3xl tighter font-bold capitalize">
            Popular product
          </h1>

          <Link className="hover:underline text-zinc-500" to="/products">
            See all
          </Link>
        </div>
        <main className="mt-4 grid grid-cols-5 gap-6">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <CardLoading key={idx} />
            ))
          ) : (
            <>
              {products?.map((product, idx) => (
                <Card key={idx} {...product} url={`/product/${product.id}`} />
              ))}
            </>
          )}
        </main>
      </section>
    </main>
  );
}

export default HomePage;
