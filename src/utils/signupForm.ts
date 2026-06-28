import { signupTermItems } from "../constants/signupTerms";
import { signupFields } from "../constants/signupFields";
import type { SignupTheme } from "../constants/signupThemes";
import {
	validateSignupBirthDate,
	validateSignupId,
	validateSignupPassword,
	signupValidationMessages,
	signupValidationRules,
} from "../constants/signupValidation";
import type { SignupFormContextValues } from "../types/signup";

export function getSignupFormDefaultValues<T extends SignupTheme>(
	themeKey: T,
): SignupFormContextValues {
	const terms = Object.fromEntries(
		signupTermItems[themeKey].map((item) => [item.id, false]),
	);

	const base = {
		password: "",
		passwordConfirm: "",
		mobile: "",
		code: "",
		terms,
	};

	switch (themeKey) {
		case "community":
			return { ...base, id: "" };
		case "news":
			return base;
		case "shopping":
			return { ...base, id: "", birthDate: "" };
	}
}

export function isRequiredTermsAgreed(
	themeKey: SignupTheme,
	terms: Record<string, boolean>,
) {
	return signupTermItems[themeKey]
		.filter((item) => item.required)
		.every((item) => terms[item.id]);
}

function validateSignupMobile(value: string | undefined): true | string {
	if (!value?.trim()) {
		return signupValidationMessages.mobile.required;
	}

	if (!signupValidationRules.mobile.pattern.test(value)) {
		return signupValidationMessages.mobile.pattern;
	}

	return true;
}

function validateSignupCode(value: string | undefined): true | string {
	if (!value?.trim()) {
		return signupValidationMessages.code.required;
	}

	if (!signupValidationRules.code.pattern.test(value)) {
		return signupValidationMessages.code.pattern;
	}

	return true;
}

function validatePasswordConfirm(
	password: string,
	confirm: string,
): true | string {
	if (!confirm?.trim()) {
		return signupValidationMessages.passwordConfirm.required;
	}

	if (confirm !== password) {
		return signupValidationMessages.passwordConfirm.mismatch;
	}

	return true;
}

export function isSignupFormValid(
	themeKey: SignupTheme,
	values: SignupFormContextValues,
	isPhoneVerified = false,
): boolean {
	for (const field of signupFields[themeKey]) {
		switch (field) {
			case "id":
				if (validateSignupId("id" in values ? values.id : undefined) !== true) {
					return false;
				}
				break;
			case "password":
				if (validateSignupPassword(values.password) !== true) return false;
				break;
			case "passwordConfirm":
				if (
					validatePasswordConfirm(
						values.password,
						values.passwordConfirm,
					) !== true
				) {
					return false;
				}
				break;
			case "birthDate":
				if (
					validateSignupBirthDate(
						"birthDate" in values ? values.birthDate : undefined,
					) !== true
				) {
					return false;
				}
				break;
			case "phoneVerification":
				if (validateSignupMobile(values.mobile) !== true) return false;
				if (!isPhoneVerified && validateSignupCode(values.code) !== true) {
					return false;
				}
				break;
		}
	}

	return isRequiredTermsAgreed(themeKey, values.terms);
}

export function canSubmitSignup(
	themeKey: SignupTheme,
	values: SignupFormContextValues,
	isPhoneVerified: boolean,
): boolean {
	return isPhoneVerified && isSignupFormValid(themeKey, values, isPhoneVerified);
}
