export const VERIFICATION_TIMER_SECONDS = 3 * 60;

export function randomDelay(minMs = 500, maxMs = 1500) {
	const ms = Math.floor(Math.random() * (maxMs - minMs)) + minMs;

	return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function getVerificationExpiresAt(fromMs: number = Date.now()) {
	return fromMs + VERIFICATION_TIMER_SECONDS * 1000;
}

export function getVerificationRemainingSeconds(
	expiresAt: number | null,
	nowMs: number = Date.now(),
) {
	if (!expiresAt) {
		return 0;
	}

	return Math.max(0, Math.ceil((expiresAt - nowMs) / 1000));
}

export function isVerificationExpired(
	expiresAt: number | null,
	nowMs: number = Date.now(),
) {
	if (!expiresAt) {
		return true;
	}

	return nowMs >= expiresAt;
}

export function formatVerificationTimer(totalSeconds: number) {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
