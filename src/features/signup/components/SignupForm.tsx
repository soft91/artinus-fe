import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/Button";
import FormField from "../../../components/FormField";
import { Input } from "../../../components/Input";
import SignupPhoneVerification from "./SignupPhoneVerification";
import SignupTerms from "./SignupTerms";
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
import type { SignupTheme } from "../constants/signupThemes";
import { signupThemes } from "../constants/signupThemes";
import { useSignupStore } from "../../../store/signup/useSignupStore";
import {
	canSubmitSignup,
	getSignupFormDefaultValues,
} from "../utils/signupForm";
import type { SignupFormContextValues } from "../types";

type Props = {
	themeKey: SignupTheme;
};

export default function SignupForm({ themeKey }: Props) {
	const theme = signupThemes[themeKey];
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
			Object.entries(mergedTerms).map(([key, value]) => [
				key,
				Boolean(value),
			]),
		),
	};

	const canSubmit = canSubmitSignup(themeKey, formValues, isPhoneVerified);

	const onSubmit = () => {
		if (!canSubmitSignup(themeKey, getValues(), isPhoneVerified)) {
			return;
		}

		navigate("/complete");
	};

	const renderField = (field: SignupFieldType) => {
		if (field === "phoneVerification") {
			return <SignupPhoneVerification key={field} themeKey={themeKey} />;
		}

		const label = signupFieldLabels[field];
		const id = field;

		if (field === "birthDate") {
			const birthDateBounds = getBirthDateInputBounds();

			return (
				<FormField
					key={field}
					label={label}
					htmlFor={id}
					error={errors.birthDate?.message}
				>
					<Input
						id={id}
						type="date"
						min={birthDateBounds.min}
						max={birthDateBounds.max}
						focusClassName={`${theme.inputFocus} cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
						onKeyDown={(event) => {
							if (event.key === "Tab") {
								return;
							}

							event.preventDefault();
						}}
						onPaste={(event) => event.preventDefault()}
						{...register("birthDate", signupRegisterRules.birthDate)}
					/>
				</FormField>
			);
		}

		if (field === "id") {
			return (
				<FormField
					key={field}
					label={label}
					htmlFor={id}
					error={errors.id?.message}
				>
					<Input
						id={id}
						type="text"
						placeholder={signupPlaceholders.id}
						maxLength={signupValidationRules.id.maxLength}
						autoComplete="username"
						focusClassName={theme.inputFocus}
						{...register("id", signupRegisterRules.id)}
					/>
				</FormField>
			);
		}

		if (field === "password") {
			return (
				<FormField
					key={field}
					label={label}
					htmlFor={id}
					error={errors.password?.message}
				>
					<Input
						id={id}
						type="password"
						placeholder={signupPlaceholders.password}
						focusClassName={theme.inputFocus}
						{...register("password", signupRegisterRules.password)}
					/>
				</FormField>
			);
		}

		if (field === "passwordConfirm") {
			return (
				<FormField
					key={field}
					label={label}
					htmlFor={id}
					error={errors.passwordConfirm?.message}
				>
					<Input
						id={id}
						type="password"
						placeholder={signupPlaceholders.passwordConfirm}
						focusClassName={theme.inputFocus}
						{...register(
							"passwordConfirm",
							getPasswordConfirmRules(() => getValues("password")),
						)}
					/>
				</FormField>
			);
		}

		return null;
	};

	return (
		<FormProvider {...methods}>
			<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
				{fields.map(renderField)}

				<SignupTerms themeKey={themeKey} />

				<Button
					type="submit"
					fullWidth
					disabled={!canSubmit || isSubmitting}
					themeClassName={`${theme.button} ${theme.buttonShadow}`}
				>
					회원가입
				</Button>
			</form>
		</FormProvider>
	);
}
