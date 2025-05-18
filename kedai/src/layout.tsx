import "@/ui/styles/style.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { Input } from "@/ui/components/input";
import { HeartPlus, ShoppingCart } from "lucide-react";
import { Link, Outlet } from "react-router";

// REACT QUERY
const queryClient = new QueryClient()

function Layout() {
    return (
        <main className="w-screen h-max bg-zinc-100 pb-22">
            <header className="w-screen bg-zinc-100 h-11 p-11 flex items-center justify-between">
                <Link to="/" className="font-bold text-2xl">DANKJE</Link>

                <div className="flex items-center gap-4">
                    <Input className="bg-white" placeholder="search your products.." />

                    <div className="flex items-center gap-3">
                        <HeartPlus />
                        <Link to="/cart">
                            <ShoppingCart />
                        </Link>
                    </div>
                </div>
            </header>

            <QueryClientProvider client={queryClient}>
                <Outlet />
            </QueryClientProvider>
        </main>
    )
}

export default Layout