import { http, HttpResponse } from "msw";
import { randomDelay } from "../utils/randomDelay";

export const handlers = [
	http.post("/api/verify", async ({ request }) => {
		const { code } = (await request.json()) as {
			mobile: string;
			code: string;
		};

		// 0.5~1.5초 랜덤 지연
		await randomDelay();

		if (code === "123456") {
			return HttpResponse.json({ verified: true });
		}

		if (code === "999999") {
			return HttpResponse.json({ error: "INTERNAL" }, { status: 500 });
		}

		return HttpResponse.json({ verified: false, reason: "MISMATCH" });
	}),
];
