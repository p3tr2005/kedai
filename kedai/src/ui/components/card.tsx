import { formatPrice } from "@/lib/utils";
import { Link } from "react-router"

type Props = {
  imageUrl: string;
  title: string;
  price: number;
  url: string;
}

function Card(product: Props) {
  return (
    <Link to={product.url} className="w-[350px] h-[400px] transition-all hover:scale-105 cursor-pointer bg-white p-3 rounded-md flex flex-col justify-between gap-3" >
      <img className="w-full h-[80%] object-contain" src={product.imageUrl} alt={product.title} width={200} height={150} />
      <div>
        <h4 className="text-sm font-light text-ellipsis whitespace-nowrap overflow-hidden">{product.title}</h4>
        <p className="font-semibold">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}

export default Card
