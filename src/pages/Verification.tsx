import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ReactOTP from "react-otp-input";
import { TimeOut } from "../components/common";
import { Button } from "antd";
import { useAppDispatch } from "../hooks";
import { verification } from "../app/store/auth/authActions";

export default function Verification() {
	const { verifying } = useLocation().state;
	const [value, setValue] = useState("");
	const email = localStorage.getItem("email");
	const verificationId = localStorage.getItem("verificationId");
	const timeOut = localStorage.getItem("timeOut");
	const [expired, setExpired] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const onSend = () => {
		if (!verificationId) return;
		dispatch(
			verification({
				verificationId: verificationId,
				code: value,
			})
		)
			.unwrap()
			.then(() =>
				navigate("/", {
					replace: true,
				})
			);
	};

	if (!verifying) {
		return (
			<Navigate
				to="/auth/login"
				replace
			/>
		);
	}

	return (
		<div className="grid place-items-center h-screen">
			<div className="w-min flex flex-col gap-4">
				<span className="text-2xl block  text-center">
					Tasdiqlash kodi sizning{" "}
					<span className="text-blue-500">{email} </span>
					po'chtangizga yuborildi!
				</span>
				<ReactOTP
					containerStyle="flex gap-4"
					inputStyle="text-5xl border-2 rounded-md aspect-square !w-20 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-300 transition-all"
					value={value}
					numInputs={6}
					onChange={setValue}
					renderInput={(props) => <input {...props} />}
				/>
				<Button
					disabled={!expired}
					type="text"
					className="!flex !w-full justify-center gap-2"
				>
					Resend Code
					<TimeOut
						timeOut={+timeOut! * 1000}
						onExpired={() => setExpired(true)}
					/>
				</Button>
				<Button
					onClick={onSend}
					type="primary"
					block
				>
					Send Code
				</Button>
			</div>
		</div>
	);
}

