import type { AxiosError } from "axios";

export type ApiError = AxiosError<{ message: string }>;

declare namespace Auth {
	export interface User {
		id: number;
		name: string;
		surname: string;
		phone: Array<string>;
		email: string;
		address: string;
		role: "user" | "admin" | "none" | "supervisor";
	}

	export interface LoginResponse {
		message: string;
		user: User;
		token: string;
	}

	export interface RegisterResponse {
		message: string;
		email: string;
		verificationId: string;
		timeOut: string;
	}
}

