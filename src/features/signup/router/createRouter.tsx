import { createBrowserRouter } from "react-router-dom";
import type { ComponentType } from "react";

import NotFound from "../../../pages/NotFound";

export function createSignupRouter(
	basename: string,
	SignupPage: ComponentType,
	CompletePage: ComponentType,
) {
	return createBrowserRouter(
		[
			{ path: "/", element: <SignupPage /> },
			{ path: "/complete", element: <CompletePage /> },
			{ path: "*", element: <NotFound /> },
		],
		{ basename },
	);
}
