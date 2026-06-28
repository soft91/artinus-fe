import { forwardRef, type ComponentPropsWithoutRef } from "react";

const baseClass =
	"size-4 shrink-0 cursor-pointer rounded border-gray-300";

export type CheckboxProps = Omit<
	ComponentPropsWithoutRef<"input">,
	"type"
> & {
	accentClassName?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	function Checkbox({ accentClassName = "", className = "", ...props }, ref) {
		return (
			<input
				ref={ref}
				type="checkbox"
				className={[baseClass, accentClassName, className]
					.filter(Boolean)
					.join(" ")}
				{...props}
			/>
		);
	},
);
