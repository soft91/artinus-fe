import { signupThemes, type SignupTheme } from "../constants/signupThemes";

type Props = {
	theme: SignupTheme;
};

export default function SignupCompleteLayout({ theme: themeKey }: Props) {
	const theme = signupThemes[themeKey];

	return (
		<div
			className={`flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 ${theme.pageBg}`}
		>
			<div
				className={`w-full max-w-lg rounded-3xl border bg-white p-8 text-center shadow-xl sm:p-10 ${theme.cardBorder}`}
			>
				<div
					className={`mx-auto flex size-20 items-center justify-center rounded-full text-white shadow-lg ${theme.button} ${theme.buttonShadow}`}
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						className="size-10"
						aria-hidden="true"
					>
						<path
							d="M5 13l4 4L19 7"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>

				<h1 className="mt-6 text-2xl font-bold text-gray-900">
					회원가입이 완료되었습니다
				</h1>

				<p className="mt-3 text-sm leading-6 text-gray-600">
					<span className={`font-semibold ${theme.link}`}>
						{theme.label}
					</span>
					에 오신 것을 환영합니다.
					<br />
					지금 바로 서비스를 이용해보세요.
				</p>

				<div className="mt-8 flex flex-col gap-3 sm:flex-row">
					<a
						href="/"
						className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
					>
						서비스 선택으로
					</a>
				</div>
			</div>
		</div>
	);
}
