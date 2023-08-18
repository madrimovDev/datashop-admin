import { useTimer } from "../../hooks";

interface Props {
	timeOut?: number;
	onExpired?: VoidFunction;
}

export default function TimeOut({ onExpired, timeOut }: Props) {
	const { seconds, minutes, totalSeconds } = useTimer({
		expiryTimestamp: Date.now() + (timeOut ?? 300000),
		onExpire() {
			onExpired && onExpired();
		},
	});

	localStorage.setItem("timeOut", JSON.stringify(totalSeconds));

	return (
		<span>
			{minutes < 9 ? `0${minutes}` : minutes}:
			{seconds < 9 ? `0${seconds}` : seconds}
		</span>
	);
}

