import type { ComponentPropsWithoutRef } from "react";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
	/** 테마 색상 클래스 (예: theme.button theme.buttonShadow) */
	themeClassName?: string;
	fullWidth?: boolean;
};

const baseClass =
	"rounded-xl text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer";

export default function Button({
	themeClassName = "",
	fullWidth = false,
	className = "",
	type = "button",
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={[
				baseClass,
				fullWidth
					? "w-full py-3.5 shadow-lg"
					: "shrink-0 px-4 py-3",
				themeClassName,
				className,
			]
				.filter(Boolean)
				.join(" ")}
			{...props}
		/>
	);
}
