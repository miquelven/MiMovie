import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.tsx";
import Popular from "./routes/Popular.tsx";
import BestWeek from "./routes/BestWeeks.tsx";
import Categories from "./routes/Categories.tsx";
import CategoryItems from "./routes/CategoryItems.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "populares", element: <Popular /> },
      { path: "/melhores", element: <BestWeek /> },
      {
        path: "/categorias",
        element: <Categories />,
      },
      { path: "/categorias/:name", element: <CategoryItems /> },
    ],
  },
]);

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 30,
    },
  },
});

client.setQueryDefaults(["movie-data"], { staleTime: 3000 });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
