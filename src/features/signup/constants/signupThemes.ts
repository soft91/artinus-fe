export type SignupTheme = "community" | "news" | "shopping";

export const SIGNUP_BASE_PATH = "/signup";

export const signupPaths: Record<SignupTheme, string> = {
	community: `${SIGNUP_BASE_PATH}/community`,
	news: `${SIGNUP_BASE_PATH}/news`,
	shopping: `${SIGNUP_BASE_PATH}/shopping`,
};

export type SignupThemeConfig = {
	label: string;
	heroImage: string;
	heroOverlay: string;
	pageBg: string;
	cardBorder: string;
	badgeBg: string;
	badgeText: string;
	button: string;
	buttonShadow: string;
	inputFocus: string;
	link: string;
	checkboxChecked: string;
	featureBg: string;
	featureText: string;
};

export const signupThemes: Record<SignupTheme, SignupThemeConfig> = {
	community: {
		label: "커뮤니티 서비스",
		heroImage: "/images/community-banner.png",
		heroOverlay:
			"bg-gradient-to-br from-violet-900/75 via-purple-900/65 to-indigo-900/75",
		pageBg: "bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100",
		cardBorder: "border-purple-100",
		badgeBg: "bg-purple-100",
		badgeText: "text-purple-700",
		button: "bg-purple-600 hover:bg-purple-700 active:bg-purple-800",
		buttonShadow: "shadow-purple-200",
		inputFocus: "focus:border-purple-500 focus:ring-purple-500/20",
		link: "text-purple-600 hover:text-purple-700",
		checkboxChecked: "accent-purple-600",
		featureBg: "bg-purple-50",
		featureText: "text-purple-800",
	},
	news: {
		label: "뉴스 구독 서비스",
		heroImage: "/images/news-banner.png",
		heroOverlay:
			"bg-gradient-to-br from-emerald-900/75 via-green-900/65 to-teal-900/75",
		pageBg: "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100",
		cardBorder: "border-emerald-100",
		badgeBg: "bg-emerald-100",
		badgeText: "text-emerald-700",
		button: "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800",
		buttonShadow: "shadow-emerald-200",
		inputFocus: "focus:border-emerald-500 focus:ring-emerald-500/20",
		link: "text-emerald-600 hover:text-emerald-700",
		checkboxChecked: "accent-emerald-600",
		featureBg: "bg-emerald-50",
		featureText: "text-emerald-800",
	},
	shopping: {
		label: "쇼핑 멤버십 서비스",
		heroImage: "/images/shopping-banner.png",
		heroOverlay:
			"bg-gradient-to-br from-orange-900/75 via-amber-900/65 to-orange-900/75",
		pageBg: "bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100",
		cardBorder: "border-orange-100",
		badgeBg: "bg-orange-100",
		badgeText: "text-orange-700",
		button: "bg-orange-500 hover:bg-orange-600 active:bg-orange-700",
		buttonShadow: "shadow-orange-200",
		inputFocus: "focus:border-orange-500 focus:ring-orange-500/20",
		link: "text-orange-600 hover:text-orange-700",
		checkboxChecked: "accent-orange-500",
		featureBg: "bg-orange-50",
		featureText: "text-orange-800",
	},
};

export const signupFeatures: Record<SignupTheme, string[]> = {
	community: ["자유로운 게시글 작성", "관심사 기반 모임", "실시간 댓글 알림"],
	news: ["맞춤형 뉴스 큐레이션", "아침/저녁 뉴스레터", "광고 없는 읽기 경험"],
	shopping: ["멤버십 전용 할인", "무료 배송 혜택", "우선 구매 기회"],
};
