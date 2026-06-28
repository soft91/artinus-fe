import type { ReactNode } from "react";

export type FormFieldMessage = {
	text: string;
	tone?: "error" | "success";
};

type FormFieldProps = {
	label: string;
	htmlFor: string;
	hideLabel?: boolean;
	inline?: boolean;
	error?: string;
	messages?: FormFieldMessage[];
	children: ReactNode;
	className?: string;
};

const messageToneClass = {
	error: "text-xs text-red-500",
	success: "text-xs text-emerald-600",
} as const;

export default function FormField({
	label,
	htmlFor,
	hideLabel = false,
	inline = false,
	error,
	messages = [],
	children,
	className = "",
}: FormFieldProps) {
	return (
		<div className={["flex flex-col gap-3", className].filter(Boolean).join(" ")}>
			<label
				htmlFor={htmlFor}
				className={
					hideLabel ? "sr-only" : "text-sm font-medium text-gray-700"
				}
			>
				{label}
			</label>

			{inline ? <div className="flex gap-2">{children}</div> : children}

			{error && <p className={messageToneClass.error}>{error}</p>}

			{messages.map((message, index) => {
				const tone = message.tone ?? "error";

				return (
					<p key={`${tone}-${index}`} className={messageToneClass[tone]}>
						{message.text}
					</p>
				);
			})}
		</div>
	);
}
