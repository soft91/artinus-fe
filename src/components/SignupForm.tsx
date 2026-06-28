import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import SignupPhoneVerification from "./SignupPhoneVerification";
import SignupTerms from "./SignupTerms.tsx";
import {
	signupFieldLabels,
	signupFields,
	type SignupFieldType,
} from "../constants/signupFields";
import {
	getPasswordConfirmRules,
	getBirthDateInputBounds,
	signupPlaceholders,
	signupRegisterRules,
	signupValidationRules,
} from "../constants/signupValidation";
import type { SignupTheme, SignupThemeConfig } from "../constants/signupThemes";
import { useSignupStore } from "../store/useSiginupStore";
import {
	canSubmitSignup,
	getSignupFormDefaultValues,
} from "../utils/signupForm";
import type { SignupFormContextValues } from "../types/signup";

type Props = {
	theme: SignupThemeConfig;
	themeKey: SignupTheme;
};

const inputClass =
	"w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:ring-4";

export default function SignupForm({ theme, themeKey }: Props) {
	const navigate = useNavigate();
	const fields = signupFields[themeKey];
	const isPhoneVerified = useSignupStore((state) => state.isPhoneVerified);
	const resetSignupStore = useSignupStore((state) => state.reset);

	const methods = useForm<SignupFormContextValues>({
		defaultValues: getSignupFormDefaultValues(themeKey),
		mode: "onBlur",
	});

	useEffect(() => {
		return () => resetSignupStore();
	}, [resetSignupStore]);

	const {
		register,
		handleSubmit,
		getValues,
		control,
		formState: { errors, isSubmitting },
	} = methods;

	const defaultValues = useMemo(
		() => getSignupFormDefaultValues(themeKey),
		[themeKey],
	);

	const watchedValues = useWatch({ control }) ?? {};
	const mergedTerms = { ...defaultValues.terms, ...watchedValues.terms };
	const formValues: SignupFormContextValues = {
		...defaultValues,
		...watchedValues,
		terms: Object.fromEntries(
			Object.entries(mergedTerms).map(([key, value]) => [key, Boolean(value)]),
		),
	};

	const canSubmit = canSubmitSignup(
		themeKey,
		formValues,
		isPhoneVerified,
	);

	const onSubmit = () => {
		if (!canSubmitSignup(themeKey, getValues(), isPhoneVerified)) {
			return;
		}

		navigate(`/signup/${themeKey}/complete`);
	};

	const renderField = (field: SignupFieldType) => {
		if (field === "phoneVerification") {
			return (
				<SignupPhoneVerification
					key={field}
					theme={theme}
					inputClass={`${inputClass} ${theme.inputFocus}`}
				/>
			);
		}

		const label = signupFieldLabels[field];
		const id = field;

		if (field === "birthDate") {
			const birthDateBounds = getBirthDateInputBounds();

			return (
				<div key={field} className="space-y-2">
					<label
						htmlFor={id}
						className="text-sm font-medium text-gray-700"
					>
						{label}
					</label>
					<input
						id={id}
						type="date"
						min={birthDateBounds.min}
						max={birthDateBounds.max}
						onKeyDown={(event) => {
							if (event.key === "Tab") {
								return;
							}

							event.preventDefault();
						}}
						onPaste={(event) => event.preventDefault()}
						className={`${inputClass} ${theme.inputFocus} cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
						{...register("birthDate", signupRegisterRules.birthDate)}
					/>
					{errors.birthDate && (
						<p className="text-xs text-red-500">
							{errors.birthDate.message}
						</p>
					)}
				</div>
			);
		}

		if (field === "id") {
			return (
				<div key={field} className="space-y-2">
					<label
						htmlFor={id}
						className="text-sm font-medium text-gray-700"
					>
						{label}
					</label>
					<input
						id={id}
						type="text"
						placeholder={signupPlaceholders.id}
						maxLength={signupValidationRules.id.maxLength}
						autoComplete="username"
						className={`${inputClass} ${theme.inputFocus}`}
						{...register("id", signupRegisterRules.id)}
					/>
					{errors.id && (
						<p className="text-xs text-red-500">{errors.id.message}</p>
					)}
				</div>
			);
		}

		if (field === "password") {
			return (
				<div key={field} className="space-y-2">
					<label
						htmlFor={id}
						className="text-sm font-medium text-gray-700"
					>
						{label}
					</label>
					<input
						id={id}
						type="password"
						placeholder={signupPlaceholders.password}
						className={`${inputClass} ${theme.inputFocus}`}
						{...register("password", signupRegisterRules.password)}
					/>
					{errors.password && (
						<p className="text-xs text-red-500">
							{errors.password.message}
						</p>
					)}
				</div>
			);
		}

		if (field === "passwordConfirm") {
			return (
				<div key={field} className="space-y-2">
					<label
						htmlFor={id}
						className="text-sm font-medium text-gray-700"
					>
						{label}
					</label>
					<input
						id={id}
						type="password"
						placeholder={signupPlaceholders.passwordConfirm}
						className={`${inputClass} ${theme.inputFocus}`}
						{...register(
							"passwordConfirm",
							getPasswordConfirmRules(() => getValues("password")),
						)}
					/>
					{errors.passwordConfirm && (
						<p className="text-xs text-red-500">
							{errors.passwordConfirm.message}
						</p>
					)}
				</div>
			);
		}

		return null;
	};

	return (
		<FormProvider {...methods}>
			<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
				{fields.map(renderField)}

				<SignupTerms theme={theme} themeKey={themeKey} />

				<button
					type="submit"
					disabled={!canSubmit || isSubmitting}
					className={`w-full rounded-xl py-3.5 text-sm font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-50 ${theme.button} ${theme.buttonShadow}`}
				>
					회원가입
				</button>
			</form>
		</FormProvider>
	);
}
