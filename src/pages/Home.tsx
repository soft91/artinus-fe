import { Link } from "react-router-dom";

import {
	signupFeatures,
	signupThemes,
	type SignupTheme,
} from "../constants/signupThemes";

const services: { theme: SignupTheme; path: string }[] = [
	{ theme: "community", path: "/signup/community" },
	{ theme: "news", path: "/signup/news" },
	{ theme: "shopping", path: "/signup/shopping" },
];

export default function Home() {
	return (
		<div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<header className="mb-12 text-center">
					<p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
						Artinus
					</p>
					<h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						서비스를 선택하고 회원가입을 시작하세요
					</h1>
					<p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
						커뮤니티, 뉴스 구독, 쇼핑 멤버십 — 원하는 서비스를 골라 소개를
						확인하고 바로 가입할 수 있습니다.
					</p>
				</header>

				<div className="grid gap-6 md:grid-cols-3">
					{services.map(({ theme, path }) => {
						const config = signupThemes[theme];
						const features = signupFeatures[theme];

						return (
							<article
								key={theme}
								className={`flex flex-col overflow-hidden rounded-3xl border bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl ${config.cardBorder}`}
							>
								<div
									className="relative min-h-44 overflow-hidden bg-cover bg-center px-6 py-8 text-white"
									style={{ backgroundImage: `url(${config.heroImage})` }}
								>
									<div
										className={`absolute inset-0 ${config.heroOverlay}`}
									/>
									<div className="relative">
										<span
											className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.badgeBg} ${config.badgeText}`}
										>
											회원가입
										</span>
										<h2 className="mt-2 text-xl font-bold">
											{config.label}
										</h2>
										<p className="mt-2 text-sm leading-6 text-white/90">
											{config.description}
										</p>
									</div>
								</div>

								<div className="flex flex-1 flex-col px-6 py-6">
									<ul className="space-y-2">
										{features.map((feature) => (
											<li
												key={feature}
												className={`rounded-xl px-3 py-2 text-sm font-medium ${config.featureBg} ${config.featureText}`}
											>
												{feature}
											</li>
										))}
									</ul>

									<Link
										to={path}
										className={`mt-6 block rounded-xl py-3 text-center text-sm font-semibold text-white shadow-md transition ${config.button} ${config.buttonShadow}`}
									>
										{config.label} 가입하기
									</Link>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</div>
	);
}
