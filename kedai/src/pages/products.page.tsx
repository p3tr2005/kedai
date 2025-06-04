import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";

import { Product, Products } from "@/lib/schemas";
import Card from "@/ui/components/card";
import CardLoading from "@/ui/components/card-loading";

const getAllProducts = async (query: string | undefined) => {
  try {
    const resp = !query
      ? await fetch("http://localhost:3001/products")
      : await fetch(`http://localhost:3001/products?search=${query}`);

    const data = (await resp.json()) as Products;

    console.log("[PRODUCTS] :", data.products);

    return data.products;
  } catch (error) {
    console.log("[ERROR] :", error);
    return [];
  }
};

function ProductsPage() {
  const queryState = useLocation().search.split("=")[1];
  console.log({ queryState });
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", queryState],
    queryFn: () => getAllProducts(queryState),
  });

  return (
    <main className="w-full h-screen px-10">
      <h1 className="text-6xl font-bold uppercase">Products</h1>
      <section className="grid grid-cols-5 mt-6">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => <CardLoading key={idx} />)
        ) : (
          <>
            {products?.map((product: Product, idx) => (
              <Card key={idx} {...product} url={`/product/${product.id}`} />
            ))}
          </>
        )}
      </section>
    </main>
  );
}

export default ProductsPage;
