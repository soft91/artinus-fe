import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { verifyPhoneCode } from "../../../api/signup/index";
import Button from "../../../components/Button";
import FormField from "../../../components/FormField";
import { Input } from "../../../components/Input";
import { useVerificationTimer } from "../hooks/useVerificationTimer";
import {
	sanitizeCodeInput,
	sanitizeMobileInput,
	signupPlaceholders,
	signupRegisterRules,
	signupValidationRules,
} from "../constants/signupValidation";
import { useSignupStore } from "../../../store/signup/useSignupStore";
import type { SignupFormContextValues } from "../types";
import { signupThemes, type SignupTheme } from "../constants/signupThemes";
import { isVerificationExpired } from "../utils/verificationTimer";

type Props = {
	themeKey: SignupTheme;
};

const verificationMessages = {
	mismatch: "인증번호가 일치하지 않습니다",
	error: "일시적인 오류가 발생했습니다. 다시 시도해주세요",
	success: "휴대폰 인증이 완료되었습니다",
	expired: "인증 시간이 만료되었습니다. 인증번호를 다시 받아주세요",
	notSent: "인증번호를 먼저 받아주세요",
};

export default function SignupPhoneVerification({ themeKey }: Props) {
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

	const resetVerificationFlow = (errorMessage: string) => {
		resetTimer();
		setValue("code", "", { shouldValidate: false });
		resetVerification();
		setVerificationStatus("error");
		setVerificationError(errorMessage);
	};

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

			if (result.status === "error") {
				resetVerificationFlow(verificationMessages.error);
				return;
			}

			setPhoneVerified(false);
			setVerificationStatus("failure");
			setVerificationError(verificationMessages.mismatch);
		} catch {
			resetVerificationFlow(verificationMessages.error);
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<p className="text-sm font-medium text-gray-700">휴대폰 인증</p>

			<FormField
				label="휴대폰 번호"
				htmlFor="mobile"
				hideLabel
				inline
				error={errors.mobile?.message}
				messages={
					isExpired && !isPhoneVerified
						? [{ text: verificationMessages.expired }]
						: []
				}
			>
				<Input
					id="mobile"
					type="tel"
					inputMode="numeric"
					placeholder={signupPlaceholders.mobile}
					maxLength={signupValidationRules.mobile.maxLength}
					disabled={isMobileDisabled}
					focusClassName={theme.inputFocus}
					ref={mobileRef}
					{...mobileRegister}
					onChange={(event) => {
						event.target.value = sanitizeMobileInput(event.target.value);
						resetTimer();
						resetVerification();
						onMobileChange(event);
					}}
				/>
				<Button
					disabled={isMobileDisabled || isVerifying}
					onClick={handleSendCode}
					themeClassName={theme.button}
				>
					{isPhoneVerified
						? "인증 완료"
						: isActive
							? formattedTime
							: "인증번호 받기"}
				</Button>
			</FormField>

			<FormField
				label="인증번호"
				htmlFor="code"
				hideLabel
				inline
				error={errors.code?.message}
				messages={[
					...(verificationError ? [{ text: verificationError }] : []),
					...(isPhoneVerified
						? [
								{
									text: verificationMessages.success,
									tone: "success" as const,
								},
							]
						: []),
				]}
			>
				<Input
					id="code"
					type="text"
					inputMode="numeric"
					placeholder={signupPlaceholders.code}
					maxLength={signupValidationRules.code.maxLength}
					disabled={!isActive || isPhoneVerified}
					focusClassName={theme.inputFocus}
					ref={codeRef}
					{...codeRegister}
					onChange={(event) => {
						event.target.value = sanitizeCodeInput(event.target.value);
						resetVerification();
						onCodeChange(event);
					}}
				/>
				<Button
					disabled={!isActive || isVerifying || isPhoneVerified}
					onClick={handleVerify}
					themeClassName={theme.button}
				>
					{isPhoneVerified
						? "인증 완료"
						: isVerifying
							? "확인 중..."
							: "인증번호 확인"}
				</Button>
			</FormField>
		</div>
	);
}
