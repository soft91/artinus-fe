import { create } from "zustand";

export type VerificationStatus =
	| "idle"
	| "pending"
	| "success"
	| "failure"
	| "error";

type SignupStoreState = {
	isPhoneVerified: boolean;
	verificationStatus: VerificationStatus;
	verificationError: string | null;
	setPhoneVerified: (verified: boolean) => void;
	setVerificationStatus: (status: VerificationStatus) => void;
	setVerificationError: (error: string | null) => void;
	resetVerification: () => void;
	reset: () => void;
};

const initialState = {
	isPhoneVerified: false,
	verificationStatus: "idle" as VerificationStatus,
	verificationError: null,
};

export const useSignupStore = create<SignupStoreState>((set) => ({
	...initialState,

	setPhoneVerified: (verified) =>
		set({
			isPhoneVerified: verified,
			verificationStatus: verified ? "success" : "idle",
			verificationError: null,
		}),

	setVerificationStatus: (verificationStatus) => set({ verificationStatus }),

	setVerificationError: (verificationError) => set({ verificationError }),

	resetVerification: () =>
		set({
			isPhoneVerified: false,
			verificationStatus: "idle",
			verificationError: null,
		}),

	reset: () => set(initialState),
}));
