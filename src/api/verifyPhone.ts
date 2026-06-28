type VerifyPhoneRequest = {
	mobile: string;
	code: string;
};

type VerifyPhoneSuccessResponse = {
	verified: true;
};

type VerifyPhoneFailureResponse = {
	verified: false;
	reason: "MISMATCH";
};

type VerifyPhoneErrorResponse = {
	error: "INTERNAL";
};

export type VerifyPhoneResult =
	| { status: "success" }
	| { status: "mismatch" }
	| { status: "error" };

export async function verifyPhoneCode(
	mobile: string,
	code: string,
): Promise<VerifyPhoneResult> {
	const response = await fetch("/api/verify", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ mobile, code } satisfies VerifyPhoneRequest),
	});

	if (response.status === 500) {
		return { status: "error" };
	}

	const data = (await response.json()) as
		| VerifyPhoneSuccessResponse
		| VerifyPhoneFailureResponse
		| VerifyPhoneErrorResponse;

	if ("error" in data) {
		return { status: "error" };
	}

	if (data.verified) {
		return { status: "success" };
	}

	return { status: "mismatch" };
}
