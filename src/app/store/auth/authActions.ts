import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config";
import { ApiError, Auth } from "../types";

interface LoginParams {
	email: string;
	password: string;
}

interface VerificationParams {
	verificationId: string;
	code: string;
}

export const login = createAsyncThunk(
	"auth/login",
	async (params: LoginParams, { rejectWithValue }) => {
		try {
			const response = await api.post<Auth.LoginResponse>(
				"/auth/login",
				params
			);
			Object.keys(response.data).forEach((key) => {
				if (key !== "message") {
					localStorage.setItem(
						key,
						JSON.stringify(response.data[key as keyof Auth.LoginResponse])
					);
				}
			});
			return response.data;
		} catch (e) {
			const err = e as ApiError;
			return rejectWithValue(err);
		}
	}
);


export const verification = createAsyncThunk(
	"auth/verification",
	async (params: VerificationParams, { rejectWithValue }) => {
		try {
			const response = await api.post<Auth.LoginResponse>(
				"/auth/verify",
				params
			);
			Object.keys(response.data).forEach((key) => {
				if (key !== "message") {
					localStorage.setItem(
						key,
						JSON.stringify(response.data[key as keyof Auth.LoginResponse])
					);
				}
			});
			return response.data;
		} catch (e) {
			const err = e as ApiError;
			return rejectWithValue(err);
		}
	}
);





