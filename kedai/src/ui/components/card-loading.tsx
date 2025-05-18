function CardLoading() {
    return (
        <div className="flex flex-col gap-4 w-[350px] h-[400px] rounded-md">
            <div className="w-full h-[70%] rounded-md bg-zinc-600 animate-pulse"></div>
            <div className="w-full h-11 rounded-md bg-zinc-600 animate-pulse"></div>
            <div className="w-[30%] h-11 rounded-md bg-zinc-600 animate-pulse"></div>
        </div>
    )
}

export default CardLoading