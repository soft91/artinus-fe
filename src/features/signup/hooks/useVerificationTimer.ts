import { useCallback, useEffect, useState } from "react";

import {
	formatVerificationTimer,
	getVerificationExpiresAt,
	getVerificationRemainingSeconds,
	isVerificationExpired,
} from "../utils/verificationTimer";

export function useVerificationTimer() {
	const [expiresAt, setExpiresAt] = useState<number | null>(null);
	const [remainingSeconds, setRemainingSeconds] = useState(0);
	const [hasExpired, setHasExpired] = useState(false);

	const isCodeSent = expiresAt !== null;
	const isExpired = hasExpired;
	const isActive = isCodeSent && !hasExpired;

	const startTimer = useCallback(() => {
		setHasExpired(false);
		setExpiresAt(getVerificationExpiresAt());
	}, []);

	const resetTimer = useCallback(() => {
		setExpiresAt(null);
		setRemainingSeconds(0);
		setHasExpired(false);
	}, []);

	useEffect(() => {
		if (!expiresAt) {
			return;
		}

		const tick = () => {
			if (isVerificationExpired(expiresAt)) {
				setHasExpired(true);
				setExpiresAt(null);
				setRemainingSeconds(0);
				return;
			}

			setRemainingSeconds(getVerificationRemainingSeconds(expiresAt));
		};

		tick();

		const intervalId = window.setInterval(tick, 1000);

		return () => window.clearInterval(intervalId);
	}, [expiresAt]);

	return {
		expiresAt,
		remainingSeconds,
		formattedTime: formatVerificationTimer(remainingSeconds),
		isCodeSent,
		isActive,
		isExpired,
		startTimer,
		resetTimer,
	};
}
