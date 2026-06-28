import { signupThemes, type SignupTheme } from "../constants/signupThemes";

export function getSignupTheme(): SignupTheme {
	const theme = document.body.dataset.theme;

	if (theme && theme in signupThemes) {
		return theme as SignupTheme;
	}

	throw new Error(`Invalid signup theme: ${theme ?? "(missing data-theme)"}`);
}
