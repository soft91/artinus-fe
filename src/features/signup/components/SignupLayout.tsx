import SignupForm from "./SignupForm";
import { signupThemes, type SignupTheme } from "../constants/signupThemes";

type Props = {
	theme: SignupTheme;
};

export default function SignupLayout({ theme: themeKey }: Props) {
	const theme = signupThemes[themeKey];

	return (
		<div className={`min-h-screen px-4 py-8 sm:px-6 lg:px-8 ${theme.pageBg}`}>
			<div className="mx-auto w-full max-w-md">
				<section
					className={`overflow-hidden rounded-3xl border bg-white shadow-xl ${theme.cardBorder}`}
				>
					<div
						className="relative overflow-hidden bg-cover bg-center px-8 py-10 text-white"
						style={{ backgroundImage: `url(${theme.heroImage})` }}
					>
						<div className={`absolute inset-0 ${theme.heroOverlay}`} />
						<div className="relative space-y-2">
							<span
								className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme.badgeBg} ${theme.badgeText}`}
							>
								회원가입
							</span>
							<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
								{theme.label}
							</h1>
						</div>
					</div>

					<div className="p-8">
						<div className="mb-6">
							<h2 className="text-xl font-bold text-gray-900">
								계정 만들기
							</h2>
							<p className="mt-1 text-sm text-gray-500">
								아래 정보를 입력하고 {theme.label}에 가입하세요.
							</p>
						</div>

						<SignupForm themeKey={themeKey} />
					</div>
				</section>
			</div>
		</div>
	);
}
