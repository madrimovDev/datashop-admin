import { createReducer, isPending, isRejected } from "@reduxjs/toolkit";
import { login, verification } from "./authActions";
import { Auth } from "../types";

interface InitialState {
	isAuth: boolean;
	user?: Auth.User;
}

const initialState: InitialState = {
	isAuth: false,
};

const authReducer = createReducer(initialState, (builder) => {
	builder.addCase(login.fulfilled, (state, action) => {
		state.isAuth = true;
		state.user = action.payload?.user;
	});
	builder.addCase(verification.fulfilled, (state, action) => {
		state.isAuth = true;
		state.user = action.payload.user;
	});
	builder.addMatcher(isPending(login, verification), (state) => {
		state.isAuth = false;
	});
	builder.addMatcher(isRejected(login, verification), () => initialState);
});

export default authReducer;

