import "@/ui/styles/style.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Link, Outlet, useLocation, useNavigate } from "react-router";

import { Input } from "@/ui/components/input";
import { HeartPlus, ShoppingCart } from "lucide-react";
import { useCart } from "./lib/hooks";
import { Toaster } from "sonner";
import { KeyboardEvent } from "react";

// REACT QUERY
const queryClient = new QueryClient();

function Layout() {
  const productsLength = useCart((state) => state.products).length;
  const navigate = useNavigate();
  const queryState = useLocation().search?.split("=")[1] || "";

  const onInputSend = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const query = event.currentTarget.value;

      console.log("[INPUT_SEND] - ", query);

      navigate(
        { pathname: "/products", search: `?search=${query}` },
        { replace: true }
      );
    }
  };

  return (
    <main className="w-screen h-max bg-zinc-100 pb-22">
      <header className="w-screen bg-zinc-100 h-11 p-11 flex items-center justify-between">
        <Link to="/" className="font-bold text-2xl">
          DANKJE
        </Link>

        <div className="flex items-center gap-4">
          <Input
            defaultValue={queryState || ""}
            className="bg-white"
            placeholder="search your products.."
            onKeyDown={onInputSend}
          />

          <div className="flex items-center gap-3">
            <HeartPlus />
            <Link className="relative" to="/cart">
              <ShoppingCart />

              {productsLength !== 0 && (
                <div className="w-5 h-5 p-2 text-white rounded-full text-sm flex items-center justify-center bg-red-600 absolute top-[-.7rem] right-[-1rem]">
                  {productsLength}
                </div>
              )}
            </Link>
          </div>
        </div>
      </header>

      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Toaster richColors />
    </main>
  );
}

export default Layout;
