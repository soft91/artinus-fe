import SignupForm from "./SignupForm";
import {
	signupFeatures,
	signupThemes,
	type SignupTheme,
} from "../constants/signupThemes";

type Props = {
	theme: SignupTheme;
};

export default function SignupLayout({ theme: themeKey }: Props) {
	const theme = signupThemes[themeKey];
	const features = signupFeatures[themeKey];

	return (
		<div className={`min-h-screen px-4 py-8 sm:px-6 lg:px-8 ${theme.pageBg}`}>
			<div className="mx-auto flex max-w-5xl flex-col gap-6 lg:flex-row lg:items-start">
				<section className="flex-1 overflow-hidden rounded-3xl border border-white/60 bg-white shadow-xl">
					<div
						className="relative min-h-56 overflow-hidden bg-cover bg-center px-8 py-10 text-white"
						style={{ backgroundImage: `url(${theme.heroImage})` }}
					>
						<div className={`absolute inset-0 ${theme.heroOverlay}`} />
						<div className="relative space-y-2">
							<span
								className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme.badgeBg} ${theme.badgeText}`}
							>
								회원가입
							</span>
							<h1 className="text-3xl font-bold tracking-tight">
								{theme.label}
							</h1>
							<p className="max-w-md text-sm leading-6 text-white/90">
								{theme.description}
							</p>
						</div>
					</div>

					<ul className="grid gap-3 px-8 py-6 sm:grid-cols-3 lg:grid-cols-1">
						{features.map((feature) => (
							<li
								key={feature}
								className={`rounded-2xl px-4 py-3 text-sm font-medium ${theme.featureBg} ${theme.featureText}`}
							>
								{feature}
							</li>
						))}
					</ul>
				</section>

				<section
					className={`w-full max-w-md rounded-3xl border bg-white p-8 shadow-xl ${theme.cardBorder}`}
				>
					<div className="mb-6">
						<h2 className="text-xl font-bold text-gray-900">
							계정 만들기
						</h2>
						<p className="mt-1 text-sm text-gray-500">
							아래 정보를 입력하고 {theme.label}에 가입하세요.
						</p>
					</div>

					<SignupForm themeKey={themeKey} />
				</section>
			</div>
		</div>
	);
}
