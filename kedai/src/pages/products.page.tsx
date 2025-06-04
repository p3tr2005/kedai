import { useLocation } from "react-router";

type QueryState = {
  query: string | undefined;
};

function ProductsPage() {
  const queryState = useLocation().state as QueryState;

  return <div>ProductsPage - {queryState.query}</div>;
}

export default ProductsPage;
