import { defineConfig, type Plugin } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import babel from "@rolldown/plugin-babel";
import { resolve } from "path";

/** /news → news.html 로 서빙 (dev·preview). 빌드 산출물은 dist/news.html */
const signupPathToHtml: Record<string, string> = {
	"/community": "/community.html",
	"/news": "/news.html",
	"/shopping": "/shopping.html",
};

function rewriteSignupUrl(url: string) {
	const [pathname, search = ""] = url.split("?");
	const query = search ? `?${search}` : "";

	for (const [path, html] of Object.entries(signupPathToHtml)) {
		if (pathname === path || pathname.startsWith(`${path}/`)) {
			return `${html}${query}`;
		}
	}

	return null;
}

function mpaDevRewrites(): Plugin {
	const applyRewrite = (req: { url?: string }) => {
		if (!req.url) {
			return;
		}

		const rewritten = rewriteSignupUrl(req.url);

		if (rewritten) {
			req.url = rewritten;
		}
	};

	return {
		name: "mpa-dev-rewrites",
		configureServer(server) {
			server.middlewares.use((req, _res, next) => {
				applyRewrite(req);
				next();
			});
		},
		configurePreviewServer(server) {
			server.middlewares.use((req, _res, next) => {
				applyRewrite(req);
				next();
			});
		},
	};
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		babel({ presets: [reactCompilerPreset()] }),
		tailwindcss(),
		mpaDevRewrites(),
	],

	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				community: resolve(__dirname, "community.html"),
				news: resolve(__dirname, "news.html"),
				shopping: resolve(__dirname, "shopping.html"),
			},
		},
	},
});
