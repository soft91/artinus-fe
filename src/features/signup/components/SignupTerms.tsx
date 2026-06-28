import { Controller, useFormContext, useWatch } from "react-hook-form";

import { Checkbox } from "../../../components/Checkbox";
import { signupTermItems } from "../constants/signupTerms";
import { validateRequiredTerm } from "../constants/signupValidation";
import { signupThemes, type SignupTheme } from "../constants/signupThemes";
import type { SignupFormContextValues } from "../types";

type Props = {
	themeKey: SignupTheme;
};

export default function SignupTerms({ themeKey }: Props) {
	const theme = signupThemes[themeKey];
	const { control, setValue, clearErrors, trigger } =
		useFormContext<SignupFormContextValues>();
	const items = signupTermItems[themeKey];
	const termFieldNames = items.map((item) => `terms.${item.id}` as const);
	const termValues = useWatch({
		control,
		name: termFieldNames,
	});

	const allChecked =
		termValues?.length === items.length && termValues.every(Boolean);

	const applyAllTerms = (checked: boolean) => {
		setValue(
			"terms",
			Object.fromEntries(items.map((item) => [item.id, checked])),
			{ shouldValidate: true, shouldDirty: true },
		);

		if (checked) {
			items.forEach((item) => clearErrors(`terms.${item.id}`));
			return;
		}

		void trigger(termFieldNames);
	};

	const handleTermChange = (
		fieldName: `terms.${string}`,
		checked: boolean,
		onChange: (value: boolean) => void,
	) => {
		onChange(checked);

		if (checked) {
			clearErrors(fieldName);
			return;
		}

		void trigger(fieldName);
	};

	return (
		<div className="space-y-3 rounded-xl bg-gray-50 p-4">
			<label className="flex cursor-pointer items-center gap-3 border-b border-gray-200 pb-3">
				<Checkbox
					checked={allChecked}
					onChange={(event) => applyAllTerms(event.target.checked)}
					accentClassName={theme.checkboxChecked}
				/>
				<span className="text-sm font-semibold text-gray-900">
					전체 동의
				</span>
			</label>

			<ul className="space-y-2">
				{items.map((item) => (
					<li key={item.id}>
						<Controller
							name={`terms.${item.id}`}
							control={control}
							rules={{
								validate: (value) =>
									validateRequiredTerm(value, item.required),
							}}
							render={({ field, fieldState }) => (
								<div>
									<label className="flex cursor-pointer items-center gap-3">
										<Checkbox
											checked={Boolean(field.value)}
											onChange={(event) =>
												handleTermChange(
													`terms.${item.id}`,
													event.target.checked,
													field.onChange,
												)
											}
											accentClassName={theme.checkboxChecked}
										/>
										<span className="flex items-center text-sm text-gray-600">
											<span
												className={`mr-1.5 text-xs font-semibold ${item.required ? "text-red-500" : "text-gray-400"}`}
											>
												({item.required ? "필수" : "선택"})
											</span>
											<button
												type="button"
												className="cursor-pointer font-medium underline-offset-2 hover:underline"
												onClick={(event) => event.stopPropagation()}
											>
												{item.label}
											</button>
										</span>
									</label>
									{fieldState.error && (
										<p className="mt-1 pl-7 text-xs text-red-500">
											{fieldState.error.message}
										</p>
									)}
								</div>
							)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
