import type { SignupTheme } from "./signupThemes";

export type SignupTermItem = {
	id: string;
	label: string;
	required: boolean;
};

export const signupTermItems: Record<SignupTheme, SignupTermItem[]> = {
	community: [
		{ id: "service", label: "서비스 이용약관", required: true },
		{ id: "privacy", label: "개인정보 수집 및 이용", required: true },
	],
	news: [
		{ id: "service", label: "서비스 이용약관", required: true },
		{ id: "privacy", label: "개인정보 수집 및 이용", required: true },
		{ id: "marketing", label: "마케팅 수신 동의", required: false },
	],
	shopping: [
		{ id: "service", label: "서비스 이용약관", required: true },
		{ id: "privacy", label: "개인정보 수집 및 이용", required: true },
		{ id: "age", label: "만 14세 이상", required: true },
		{ id: "marketing", label: "마케팅 수신 동의", required: false },
	],
};
