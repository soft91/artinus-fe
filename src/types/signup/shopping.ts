import type {
	SignupPasswordFields,
	SignupPhoneFields,
	SignupTermValues,
} from "./common";

export type ShoppingSignupFormValues = SignupPasswordFields &
	SignupPhoneFields & {
		id: string;
		birthDate: string;
		terms: SignupTermValues;
	};
