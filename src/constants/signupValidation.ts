import type { RegisterOptions } from "react-hook-form";

import type { SignupPasswordFields } from "../types/signup";

export const signupValidationRules = {
	id: {
		minLength: 4,
		maxLength: 20,
		startsWithLetter: /^[a-zA-Z]/,
		allowedChars: /^[a-zA-Z0-9]+$/,
	},
	password: {
		minLength: 8,
		hasLetter: /[a-zA-Z]/,
		hasNumber: /[0-9]/,
		hasSpecialChar: /[^a-zA-Z0-9]/,
	},
	mobile: {
		pattern: /^01[0-9]{8,9}$/,
		maxLength: 11,
		nonDigit: /[^0-9]/g,
	},
	code: {
		pattern: /^[0-9]{6}$/,
		maxLength: 6,
		nonDigit: /[^0-9]/g,
	},
	birthDate: {
		pattern: /^\d{4}-\d{2}-\d{2}$/,
		minYear: 1900,
		minAge: 14, // 만 14세 미만은 가입 불가
	},
} as const;

export const signupValidationMessages = {
	id: {
		required: "아이디를 입력해주세요",
		length: `아이디는 ${signupValidationRules.id.minLength}~${signupValidationRules.id.maxLength}자로 입력해주세요`,
		startsWithLetter: "아이디는 영문으로 시작해야 합니다",
		allowedChars: "아이디는 영문, 숫자만 사용할 수 있습니다",
	},
	password: {
		required: "비밀번호를 입력해주세요",
		minLength:
			"비밀번호는 8자 이상, 영문 + 숫자 + 특수문자 조합으로 입력해주세요",
		combination: "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다",
	},
	passwordConfirm: {
		required: "비밀번호 확인을 입력해주세요",
		mismatch: "비밀번호가 일치하지 않습니다",
	},
	birthDate: {
		required: "생년월일을 입력해주세요",
		pattern: "올바른 생년월일을 입력해주세요",
		future: "생년월일은 오늘 이후일 수 없습니다",
		minAge: "만 14세 이상만 가입할 수 있습니다",
	},
	mobile: {
		required: "휴대폰 번호를 입력해주세요",
		pattern: "올바른 휴대폰 번호를 입력해주세요",
	},
	code: {
		required: "인증번호를 입력해주세요",
		pattern: "인증번호 6자리를 입력해주세요",
	},
	terms: {
		required: "필수 약관에 동의해주세요",
	},
} as const;

export function validateSignupId(value: string | undefined): true | string {
	if (!value?.trim()) {
		return signupValidationMessages.id.required;
	}

	const { minLength, maxLength, startsWithLetter, allowedChars } =
		signupValidationRules.id;

	if (value.length < minLength || value.length > maxLength) {
		return signupValidationMessages.id.length;
	}

	if (!startsWithLetter.test(value)) {
		return signupValidationMessages.id.startsWithLetter;
	}

	if (!allowedChars.test(value)) {
		return signupValidationMessages.id.allowedChars;
	}

	return true;
}

export function validateSignupPassword(
	value: string | undefined,
): true | string {
	if (!value?.trim()) {
		return signupValidationMessages.password.required;
	}

	const { minLength, hasLetter, hasNumber, hasSpecialChar } =
		signupValidationRules.password;

	if (value.length < minLength) {
		return signupValidationMessages.password.minLength;
	}

	if (
		!hasLetter.test(value) ||
		!hasNumber.test(value) ||
		!hasSpecialChar.test(value)
	) {
		return signupValidationMessages.password.combination;
	}

	return true;
}

function toISODateString(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

export function getBirthDateInputBounds() {
	const { minYear, minAge } = signupValidationRules.birthDate;
	const maxBirthDate = new Date();
	maxBirthDate.setFullYear(maxBirthDate.getFullYear() - minAge);

	return {
		min: `${minYear}-01-01`,
		max: toISODateString(maxBirthDate),
	};
}

export function validateSignupBirthDate(
	value: string | undefined,
): true | string {
	if (!value?.trim()) {
		return signupValidationMessages.birthDate.required;
	}

	if (!signupValidationRules.birthDate.pattern.test(value)) {
		return signupValidationMessages.birthDate.pattern;
	}

	const [year, month, day] = value.split("-").map(Number);

	if (year < signupValidationRules.birthDate.minYear) {
		return signupValidationMessages.birthDate.pattern;
	}

	const date = new Date(year, month - 1, day);

	if (
		date.getFullYear() !== year ||
		date.getMonth() !== month - 1 ||
		date.getDate() !== day
	) {
		return signupValidationMessages.birthDate.pattern;
	}

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	if (date > today) {
		return signupValidationMessages.birthDate.future;
	}

	const minAgeCutoff = new Date();
	minAgeCutoff.setFullYear(
		minAgeCutoff.getFullYear() - signupValidationRules.birthDate.minAge,
	);
	minAgeCutoff.setHours(0, 0, 0, 0);

	if (date > minAgeCutoff) {
		return signupValidationMessages.birthDate.minAge;
	}

	return true;
}

/** 숫자가 아닌 문자는 공백으로 치환 */
export function sanitizeNumericInput(
	value: string,
	nonDigit: RegExp = signupValidationRules.mobile.nonDigit,
): string {
	return value.replace(nonDigit, " ").replace(/\s/g, "");
}

export function sanitizeMobileInput(value: string): string {
	return sanitizeNumericInput(value, signupValidationRules.mobile.nonDigit);
}

export function sanitizeCodeInput(value: string): string {
	return sanitizeNumericInput(value, signupValidationRules.code.nonDigit);
}

export function validateRequiredTerm(
	value: boolean,
	required: boolean,
): true | string {
	return !required || value || signupValidationMessages.terms.required;
}

export function getPasswordConfirmRules(
	getPassword: () => string,
): RegisterOptions<SignupPasswordFields, "passwordConfirm"> {
	return {
		required: signupValidationMessages.passwordConfirm.required,
		validate: (value) =>
			value === getPassword() ||
			signupValidationMessages.passwordConfirm.mismatch,
	};
}

export const signupRegisterRules = {
	id: {
		validate: validateSignupId,
	},
	password: {
		validate: validateSignupPassword,
	},
	birthDate: {
		validate: validateSignupBirthDate,
	},
	mobile: {
		required: signupValidationMessages.mobile.required,
		pattern: {
			value: signupValidationRules.mobile.pattern,
			message: signupValidationMessages.mobile.pattern,
		},
	},
	code: {
		required: signupValidationMessages.code.required,
		pattern: {
			value: signupValidationRules.code.pattern,
			message: signupValidationMessages.code.pattern,
		},
	},
} as const;

export const signupPlaceholders = {
	id: "영문으로 시작, 4~20자",
	password: "8자 이상, 영문+숫자+특수문자",
	passwordConfirm: "비밀번호를 다시 입력해주세요",
	mobile: "01012345678",
	code: "인증번호 6자리",
} as const;
