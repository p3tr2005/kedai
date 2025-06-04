import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import HomePage from "./pages/home.page";
import CartPage from "./pages/cart.page";
import DetailPage from "./pages/detail.page";
import ProductsPage from "./pages/products.page";
import RootLayout from "./layout";

// ROUTES
const routes = [
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "cart",
        Component: CartPage,
      },
      {
        path: "product",
        children: [
          {
            path: ":id",
            Component: DetailPage,
          },
        ],
      },
      {
        path: "products",
        Component: ProductsPage
      },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
