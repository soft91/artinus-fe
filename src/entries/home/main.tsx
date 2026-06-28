import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import { mountApp } from "../mountApp";

const router = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{ path: "*", element: <NotFound /> },
]);

mountApp(<RouterProvider router={router} />);
