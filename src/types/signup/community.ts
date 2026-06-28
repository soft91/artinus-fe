import type {
	SignupPasswordFields,
	SignupPhoneFields,
	SignupTermValues,
} from "./common";

export type CommunitySignupFormValues = SignupPasswordFields &
	SignupPhoneFields & {
		id: string;
		terms: SignupTermValues;
	};
