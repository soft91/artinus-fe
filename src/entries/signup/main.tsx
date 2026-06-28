import { RouterProvider } from "react-router-dom";

import SignupCompleteLayout from "../../components/SignupCompleteLayout";
import SignupLayout from "../../components/SignupLayout";
import { signupPaths, signupThemes, type SignupTheme } from "../../constants/signupThemes";
import { mountApp } from "../mountApp.tsx";
import { createSignupRouter } from "./createRouter.tsx";

function getSignupTheme(): SignupTheme {
	const theme = document.body.dataset.theme;

	if (theme && theme in signupThemes) {
		return theme as SignupTheme;
	}

	throw new Error(`Invalid signup theme: ${theme ?? "(missing data-theme)"}`);
}

const theme = getSignupTheme();

const router = createSignupRouter(
	signupPaths[theme],
	() => <SignupLayout theme={theme} />,
	() => <SignupCompleteLayout theme={theme} />,
);

mountApp(<RouterProvider router={router} />);
