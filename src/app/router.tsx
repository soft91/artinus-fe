import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import CommunitySignup from "../pages/signup/CommunitySignup";
import CommunitySignupComplete from "../pages/signup/CommunitySignupComplete";
import NewsSignup from "../pages/signup/NewsSignup";
import NewsSignupComplete from "../pages/signup/NewsSignupComplete";
import NotFound from "../pages/NotFound";
import ShoppingSignup from "../pages/signup/ShoppingSignup";
import ShoppingSignupComplete from "../pages/signup/ShoppingSignupComplete";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},

	{
		path: "/signup/community",
		element: <CommunitySignup />,
	},

	{
		path: "/signup/community/complete",
		element: <CommunitySignupComplete />,
	},

	{
		path: "/signup/news",
		element: <NewsSignup />,
	},

	{
		path: "/signup/news/complete",
		element: <NewsSignupComplete />,
	},

	{
		path: "/signup/shopping",
		element: <ShoppingSignup />,
	},

	{
		path: "/signup/shopping/complete",
		element: <ShoppingSignupComplete />,
	},

	{
		path: "*",
		element: <NotFound />,
	},
]);
