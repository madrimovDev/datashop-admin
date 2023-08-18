import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

export default function RequireAuth() {
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const startingTime = localStorage.getItem("startingTime");
	if (startingTime && +startingTime > Date.now()) {
		return (
			<Navigate
				to="/auth/verification"
				replace
				state={{
					verifying: true,
				}}
			/>
		);
	}

	if (isAuth) {
		return <Outlet />;
	}
	return (
		<Navigate
			to="/auth/login"
			replace
		/>
	);
}

