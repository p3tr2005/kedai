import { Button } from "./button"

function Navbar() {
    return (
        <nav className="w-full bg-white h-[30rem] px-8 rounded-md p-6 border-black relative">
            <img
                className=" border-black w-[500px] h-[400px] object-contain bottom-[2rem] left-[20rem] absolute"
                src="/BOBA_02.png"
                width={300}
                height={400}
                alt="AirPots"
            />

            <div className="flex flex-col gap-4 absolute right-[8rem] top-[12rem]">
                <h1 className="text-6xl font-bold ">ALL BOBA YOU WANT</h1>
                <Button size="lg" className="w-28">
                    Go buy
                </Button>
            </div>
        </nav>
    )
}

export default Navbar