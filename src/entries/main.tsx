import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { bootstrap } from "./bootstrap.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

bootstrap(<RouterProvider router={router} />);
