import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { verifyPhoneCode } from "../api/verifyPhone";
import { useVerificationTimer } from "../hooks/useVerificationTimer";
import {
	sanitizeCodeInput,
	sanitizeMobileInput,
	signupPlaceholders,
	signupRegisterRules,
	signupValidationRules,
} from "../constants/signupValidation";
import { useSignupStore } from "../store/useSignupStore";
import type { SignupFormContextValues } from "../types/signup";
import { signupThemes, type SignupTheme } from "../constants/signupThemes";
import { isVerificationExpired } from "../utils";

type Props = {
	themeKey: SignupTheme;
	inputClass: string;
};

const verificationMessages = {
	mismatch: "인증번호가 일치하지 않습니다",
	error: "일시적인 오류가 발생했습니다. 다시 시도해주세요",
	success: "휴대폰 인증이 완료되었습니다",
	expired: "인증 시간이 만료되었습니다. 인증번호를 다시 받아주세요",
	notSent: "인증번호를 먼저 받아주세요",
};

export default function SignupPhoneVerification({ themeKey, inputClass }: Props) {
	const theme = signupThemes[themeKey];
	const {
		register,
		getValues,
		trigger,
		setValue,
		formState: { errors },
	} = useFormContext<SignupFormContextValues>();

	const {
		isPhoneVerified,
		verificationStatus,
		verificationError,
		setPhoneVerified,
		setVerificationStatus,
		setVerificationError,
		resetVerification,
	} = useSignupStore();

	const {
		expiresAt,
		formattedTime,
		isActive,
		isExpired,
		startTimer,
		resetTimer,
	} = useVerificationTimer();

	const {
		ref: mobileRef,
		onChange: onMobileChange,
		...mobileRegister
	} = register("mobile", signupRegisterRules.mobile);

	const {
		ref: codeRef,
		onChange: onCodeChange,
		...codeRegister
	} = register("code", signupRegisterRules.code);

	const isVerifying = verificationStatus === "pending";
	const isMobileDisabled = isActive || isPhoneVerified;

	useEffect(() => {
		if (!isExpired || isPhoneVerified) {
			return;
		}

		resetVerification();
		setValue("code", "", { shouldValidate: false });
	}, [isExpired, isPhoneVerified, resetVerification, setValue]);

	useEffect(() => {
		if (!isPhoneVerified) {
			return;
		}

		resetTimer();
	}, [isPhoneVerified, resetTimer]);

	const handleSendCode = async () => {
		if (isActive) {
			return;
		}

		const isMobileValid = await trigger("mobile");

		if (!isMobileValid) {
			return;
		}

		resetVerification();
		setValue("code", "", { shouldValidate: false });
		startTimer();
		setVerificationError(null);
	};

	const handleVerify = async () => {
		if (!isActive) {
			setVerificationError(
				isExpired
					? verificationMessages.expired
					: verificationMessages.notSent,
			);
			return;
		}

		const isMobileValid = await trigger("mobile");
		const isCodeValid = await trigger("code");

		if (!isMobileValid || !isCodeValid) {
			return;
		}

		setVerificationStatus("pending");
		setVerificationError(null);

		try {
			const result = await verifyPhoneCode(
				getValues("mobile"),
				getValues("code"),
			);

			if (isVerificationExpired(expiresAt)) {
				setPhoneVerified(false);
				setVerificationStatus("idle");
				setVerificationError(verificationMessages.expired);
				return;
			}

			if (result.status === "success") {
				resetTimer();
				setPhoneVerified(true);
				return;
			}

			setPhoneVerified(false);
			setVerificationStatus(result.status === "error" ? "error" : "failure");
			setVerificationError(
				result.status === "error"
					? verificationMessages.error
					: verificationMessages.mismatch,
			);
		} catch {
			setPhoneVerified(false);
			setVerificationStatus("error");
			setVerificationError(verificationMessages.error);
		}
	};

	return (
		<fieldset className="space-y-3">
			<legend className="text-sm font-medium text-gray-700">
				휴대폰 인증
			</legend>

			<div className="space-y-2">
				<label htmlFor="mobile" className="sr-only">
					휴대폰 번호
				</label>
				<div className="flex gap-2">
					<input
						id="mobile"
						type="tel"
						inputMode="numeric"
						placeholder={signupPlaceholders.mobile}
						maxLength={signupValidationRules.mobile.maxLength}
						disabled={isMobileDisabled}
						className={`${inputClass} disabled:cursor-not-allowed disabled:bg-gray-100`}
						ref={mobileRef}
						{...mobileRegister}
						onChange={(event) => {
							event.target.value = sanitizeMobileInput(
								event.target.value,
							);
							resetTimer();
							resetVerification();
							onMobileChange(event);
						}}
					/>
					<button
						type="button"
						disabled={isMobileDisabled || isVerifying}
						onClick={handleSendCode}
						className={`shrink-0 rounded-xl px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${theme.button} cursor-pointer`}
					>
						{isPhoneVerified
							? "인증 완료"
							: isActive
								? formattedTime
								: "인증번호 받기"}
					</button>
				</div>
				{errors.mobile && (
					<p className="text-xs text-red-500">{errors.mobile.message}</p>
				)}
				{isExpired && !isPhoneVerified && (
					<p className="text-xs text-red-500">
						{verificationMessages.expired}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<label htmlFor="code" className="sr-only">
					인증번호
				</label>
				<div className="flex gap-2">
					<input
						id="code"
						type="text"
						inputMode="numeric"
						placeholder={signupPlaceholders.code}
						maxLength={signupValidationRules.code.maxLength}
						disabled={!isActive || isPhoneVerified}
						className={`${inputClass} disabled:cursor-not-allowed disabled:bg-gray-100`}
						ref={codeRef}
						{...codeRegister}
						onChange={(event) => {
							event.target.value = sanitizeCodeInput(event.target.value);
							resetVerification();
							onCodeChange(event);
						}}
					/>
					<button
						type="button"
						disabled={!isActive || isVerifying || isPhoneVerified}
						onClick={handleVerify}
						className={`shrink-0 rounded-xl px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${theme.button} cursor-pointer`}
					>
						{isPhoneVerified
							? "인증 완료"
							: isVerifying
								? "확인 중..."
								: "인증번호 확인"}
					</button>
				</div>
				{errors.code && (
					<p className="text-xs text-red-500">{errors.code.message}</p>
				)}
				{verificationError && (
					<p className="text-xs text-red-500">{verificationError}</p>
				)}
				{isPhoneVerified && (
					<p className="text-xs text-emerald-600">
						{verificationMessages.success}
					</p>
				)}
			</div>
		</fieldset>
	);
}
