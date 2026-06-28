import React from "react";
import ReactDOM from "react-dom/client";

import "../index.css";

async function enableMocking() {
	if (import.meta.env.DEV) {
		const { worker } = await import("../mocks/browser");

		await worker.start();
	}
}

export async function bootstrap(rootElement: React.ReactNode) {
	await enableMocking();

	ReactDOM.createRoot(document.getElementById("root")!).render(
		<React.StrictMode>{rootElement}</React.StrictMode>,
	);
}
