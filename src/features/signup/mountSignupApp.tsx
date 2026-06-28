import { RouterProvider } from "react-router-dom";

import { mountApp } from "../../entries/mountApp";
import SignupCompleteLayout from "./components/SignupCompleteLayout";
import SignupLayout from "./components/SignupLayout";
import { signupPaths, type SignupTheme } from "./constants/signupThemes";
import { createSignupRouter } from "./router/createRouter";

export function mountSignupApp(theme: SignupTheme) {
	const router = createSignupRouter(
		signupPaths[theme],
		() => <SignupLayout theme={theme} />,
		() => <SignupCompleteLayout theme={theme} />,
	);

	mountApp(<RouterProvider router={router} />);
}
