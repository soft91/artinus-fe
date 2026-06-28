import { forwardRef, type ComponentPropsWithoutRef } from "react";

const baseClass =
	"w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:ring-4 disabled:cursor-not-allowed disabled:bg-gray-100";

export type InputProps = ComponentPropsWithoutRef<"input"> & {
	focusClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ focusClassName = "", className = "", ...props },
	ref,
) {
	return (
		<input
			ref={ref}
			className={[baseClass, focusClassName, className]
				.filter(Boolean)
				.join(" ")}
			{...props}
		/>
	);
});
