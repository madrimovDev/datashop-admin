import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
});

api.interceptors.request.use((config) => {
	const url = config.url?.split("/");
	if (url?.includes("auth")) {
		return config;
	}
	const token = window.localStorage.getItem("token");
	if (!token) {
		return config;
	}
	config.headers.Authorization = JSON.parse(token);
	return config;
});

export default api;
