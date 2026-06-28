import { http, HttpResponse } from "msw";
import { randomDelay } from "../utils";

type VerifyRequestBody = {
	mobile: string;
	code: string;
};

function parseVerifyRequestBody(body: unknown): VerifyRequestBody | null {
	if (typeof body !== "object" || body === null) {
		return null;
	}

	const { mobile, code } = body as Record<string, unknown>;

	if (typeof mobile !== "string" || typeof code !== "string") {
		return null;
	}

	if (!mobile.trim() || !code.trim()) {
		return null;
	}

	return { mobile, code };
}

export const handlers = [
	http.post("/api/verify", async ({ request }) => {
		let body: unknown;

		try {
			body = await request.json();
		} catch {
			return HttpResponse.json(
				{ error: "INVALID_REQUEST" },
				{ status: 400 },
			);
		}

		const parsed = parseVerifyRequestBody(body);

		if (!parsed) {
			return HttpResponse.json(
				{ error: "INVALID_REQUEST" },
				{ status: 400 },
			);
		}

		const { code } = parsed;

		try {
			await randomDelay();
		} catch {
			return HttpResponse.json({ error: "INTERNAL" }, { status: 500 });
		}

		if (code === "123456") {
			return HttpResponse.json({ verified: true });
		}

		if (code === "999999") {
			return HttpResponse.json({ error: "INTERNAL" }, { status: 500 });
		}

		return HttpResponse.json({ verified: false, reason: "MISMATCH" });
	}),
];
