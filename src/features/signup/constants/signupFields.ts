import type { SignupTheme } from "./signupThemes";

export type SignupFieldType =
	| "id"
	| "password"
	| "passwordConfirm"
	| "birthDate"
	| "phoneVerification";

export const signupFields: Record<SignupTheme, SignupFieldType[]> = {
	community: ["id", "password", "passwordConfirm", "phoneVerification"],
	news: ["phoneVerification", "password", "passwordConfirm"],
	shopping: ["id", "password", "passwordConfirm", "birthDate", "phoneVerification"],
};

export const signupFieldLabels: Record<SignupFieldType, string> = {
	id: "ID",
	password: "비밀번호",
	passwordConfirm: "비밀번호 확인",
	birthDate: "생년월일",
	phoneVerification: "휴대폰 인증",
};
