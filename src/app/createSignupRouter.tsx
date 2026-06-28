import { createHashRouter } from "react-router-dom";
import type { ComponentType } from "react";

import NotFound from "../pages/NotFound";

export function createSignupRouter(
	SignupPage: ComponentType,
	CompletePage: ComponentType,
) {
	return createHashRouter([
		{
			path: "/",
			element: <SignupPage />,
		},
		{
			path: "/complete",
			element: <CompletePage />,
		},
		{
			path: "*",
			element: <NotFound />,
		},
	]);
}
