import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import babel from "@rolldown/plugin-babel";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		babel({ presets: [reactCompilerPreset()] }),
		tailwindcss(),
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
