export type SignupTermValues = Record<string, boolean>;

export type SignupPhoneFields = {
	mobile: string;
	code: string;
};

export type SignupPasswordFields = {
	password: string;
	passwordConfirm: string;
};

/** 공유 폼 컴포넌트에서 사용하는 런타임 타입 */
export type SignupFormContextValues = SignupPasswordFields &
	SignupPhoneFields & {
		id?: string;
		birthDate?: string;
		terms: SignupTermValues;
	};
