type VerifyPhoneRequest = {
	mobile: string;
	code: string;
};

export type VerifyPhoneResult =
	| { status: "success" }
	| { status: "mismatch" }
	| { status: "error" };

function parseVerifyResponse(data: unknown): VerifyPhoneResult | null {
	if (typeof data !== "object" || data === null) {
		return null;
	}

	if ("error" in data) {
		return { status: "error" };
	}

	if ("verified" in data && data.verified === true) {
		return { status: "success" };
	}

	if (
		"verified" in data &&
		data.verified === false &&
		"reason" in data &&
		data.reason === "MISMATCH"
	) {
		return { status: "mismatch" };
	}

	return null;
}

export async function verifyPhoneCode(
	mobile: string,
	code: string,
): Promise<VerifyPhoneResult> {
	try {
		const response = await fetch("/api/verify", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ mobile, code } satisfies VerifyPhoneRequest),
		});

		if (!response.ok) {
			return { status: "error" };
		}

		let data: unknown;

		try {
			data = await response.json();
		} catch {
			return { status: "error" };
		}

		return parseVerifyResponse(data) ?? { status: "error" };
	} catch {
		return { status: "error" };
	}
}
