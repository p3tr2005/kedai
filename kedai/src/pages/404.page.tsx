import { Button } from "@/ui/components/button"
import { Link } from "react-router"

function NotFoundPage() {
    return (
        <main className="w-screen h-screen bg-zinc-100">
            <h1>Page do not found!</h1>

            <Button asChild>
                <Link to="/">Back to page</Link>
            </Button>
        </main>
    )
}

export default NotFoundPage