import { Controller, useFormContext, useWatch } from "react-hook-form";

import { signupTermItems } from "../constants/signupTerms";
import { validateRequiredTerm } from "../constants/signupValidation";
import type { SignupTheme, SignupThemeConfig } from "../constants/signupThemes";
import type { SignupFormContextValues } from "../types/signup";

type Props = {
	theme: SignupThemeConfig;
	themeKey: SignupTheme;
};

const checkboxBaseClass =
	"size-4 shrink-0 cursor-pointer rounded border-gray-300";

export default function SignupTerms({ theme, themeKey }: Props) {
	const { control, setValue, clearErrors, trigger } =
		useFormContext<SignupFormContextValues>();
	const items = signupTermItems[themeKey];
	const checkboxClass = `${checkboxBaseClass} ${theme.checkboxChecked}`;
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
				<input
					type="checkbox"
					checked={allChecked}
					onChange={(event) => applyAllTerms(event.target.checked)}
					className={checkboxClass}
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
										<input
											type="checkbox"
											checked={Boolean(field.value)}
											onChange={(event) =>
												handleTermChange(
													`terms.${item.id}`,
													event.target.checked,
													field.onChange,
												)
											}
											className={checkboxClass}
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
