export type SignupTermValues = Record<string, boolean>;

export type SignupPhoneFields = {
	mobile: string;
	code: string;
};

export type SignupPasswordFields = {
	password: string;
	passwordConfirm: string;
};
