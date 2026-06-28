import { defineConfig, type Plugin } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import babel from "@rolldown/plugin-babel";
import { resolve } from "path";

/** /signup/news → signup/news.html (dev·preview). 빌드 산출물: dist/signup/news.html */
const signupPathToHtml: Record<string, string> = {
	"/signup/community": "/signup/community.html",
	"/signup/news": "/signup/news.html",
	"/signup/shopping": "/signup/shopping.html",
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
				"signup/community": resolve(__dirname, "signup/community.html"),
				"signup/news": resolve(__dirname, "signup/news.html"),
				"signup/shopping": resolve(__dirname, "signup/shopping.html"),
			},
		},
	},
});
