import { useState, useEffect, useCallback } from "react";

interface TimerOptions {
	expiryTimestamp: number;
	onExpire: () => void;
}

interface TimerState {
	totalMilliseconds: number;
	totalSeconds: number;
	seconds: number;
	minutes: number;
	hours: number;
	days: number;
	isRunning: boolean;
	start: () => void;
	pause: () => void;
	resume: () => void;
	restart: () => void;
}

export const useTimer = ({ expiryTimestamp, onExpire }: TimerOptions): TimerState => {
	const [isRunning, setIsRunning] = useState(true); // Auto-start timer
	const [totalMilliseconds, setTotalMilliseconds] = useState(
		Math.max(expiryTimestamp - Date.now(), 0)
	);

	useEffect(() => {
		let interval: number;

		if (isRunning && totalMilliseconds > 0) {
			interval = setInterval(() => {
				setTotalMilliseconds(
					(prevTotalMilliseconds) => prevTotalMilliseconds - 1000
				);
			}, 1000);
		} else if (totalMilliseconds === 0) {
			clearInterval(interval!);
			onExpire();
		}

		return () => clearInterval(interval);
	}, [isRunning, totalMilliseconds, onExpire]);

	const pause = useCallback(() => {
		setIsRunning(false);
	}, []);

	const resume = useCallback(() => {
		setIsRunning(true);
	}, []);

	const restart = useCallback(() => {
		setIsRunning(true);
		setTotalMilliseconds(Math.max(expiryTimestamp - Date.now(), 0));
	}, [expiryTimestamp]);

	const totalSeconds = Math.floor(totalMilliseconds / 1000);
	const seconds = totalSeconds % 60;
	const minutes = Math.floor((totalSeconds / 60) % 60);
	const hours = Math.floor((totalSeconds / 3600) % 24);
	const days = Math.floor(totalSeconds / 86400);

	return {
		totalMilliseconds,
		totalSeconds,
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start: resume, // Combine start and resume since the timer is auto-started
		pause,
		resume,
		restart,
	};
};


