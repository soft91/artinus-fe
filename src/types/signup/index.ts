import type { SignupTheme } from "../../constants/signupThemes";

import type { CommunitySignupFormValues } from "./community";
import type { NewsSignupFormValues } from "./news";
import type { ShoppingSignupFormValues } from "./shopping";
import type {
	SignupPasswordFields,
	SignupPhoneFields,
	SignupTermValues,
} from "./common";

export type { CommunitySignupFormValues } from "./community";
export type { NewsSignupFormValues } from "./news";
export type { ShoppingSignupFormValues } from "./shopping";
export type {
	SignupPasswordFields,
	SignupPhoneFields,
	SignupTermValues,
} from "./common";

export type SignupFormValuesMap = {
	community: CommunitySignupFormValues;
	news: NewsSignupFormValues;
	shopping: ShoppingSignupFormValues;
};

export type SignupFormValues<T extends SignupTheme = SignupTheme> =
	SignupFormValuesMap[T];

/** 공유 폼 컴포넌트에서 사용하는 런타임 타입 */
export type SignupFormContextValues = SignupPasswordFields &
	SignupPhoneFields & {
		id?: string;
		birthDate?: string;
		terms: SignupTermValues;
	};
