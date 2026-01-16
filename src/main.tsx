import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.tsx";
import Popular from "./routes/Popular.tsx";
import BestWeek from "./routes/BestWeeks.tsx";
import Categories from "./routes/Categories.tsx";
import CategoryItems from "./routes/CategoryItems.tsx";
import MovieInfo from "./routes/MovieInfo.tsx";
import Favorites from "./routes/Favorites.tsx";
import WatchLater from "./routes/WatchLater.tsx";
import Search from "./routes/Search.tsx";
import PersonDetails from "./routes/PersonDetails.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/populares", element: <Popular /> },
      { path: "/melhores", element: <BestWeek /> },
      { path: "/search/:name", element: <Search /> },
      { path: "/person/:id", element: <PersonDetails /> },
      { path: "/favoritos", element: <Favorites /> },
      { path: "/assistirMaisTarde", element: <WatchLater /> },
      {
        path: "/categorias",
        element: <Categories />,
      },
      { path: "/categorias/:name", element: <CategoryItems /> },
      { path: "/:name", element: <MovieInfo /> },
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={client}>
        <ToastContainer
          toastStyle={{ background: "#0a0d14", color: "white" }}
          icon={false}
          hideProgressBar={true}
        />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
