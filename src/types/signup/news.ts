import type {
	SignupPasswordFields,
	SignupPhoneFields,
	SignupTermValues,
} from "./common";

export type NewsSignupFormValues = SignupPasswordFields &
	SignupPhoneFields & {
		terms: SignupTermValues;
	};
