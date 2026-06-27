export function randomDelay(minMs = 500, maxMs = 1500) {
	const ms = Math.floor(Math.random() * (maxMs - minMs)) + minMs;

	return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
