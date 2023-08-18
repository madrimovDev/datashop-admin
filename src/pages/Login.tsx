import { Button, Form, Input, Typography, notification } from "antd";
import { useAppDispatch } from "../hooks";
import { login } from "../app/store/auth/authActions";
import { ApiError } from "../app/store/types";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const onFinish = async (data: { email: string; password: string }) => {
		try {
			const res = await dispatch(login(data)).unwrap();
			navigate("/", {
				replace: true,
				relative: "path",
			});
			notification.success({
				message: res.message,
			});
		} catch (e) {
			const error = e as ApiError;
			notification.error({
				role: "status",
				message: error.response?.data.message ?? "Something went wrong",
			});
		}
	};
	return (
		<div className="h-screen grid place-items-center">
			<Form
				layout="vertical"
				onFinish={onFinish}
				className="max-w-sm w-full"
			>
				<Typography.Title level={3}>Login</Typography.Title>
				<Form.Item
					name="email"
					label="Email"
					rules={[
						{
							type: "email",
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="password"
					label="Password"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item>
					<Button
						block
						type="primary"
						htmlType="submit"
					>
						Kirish
					</Button>
				</Form.Item>
				<Link to="/auth/register">Ro'yhatdan o'tish</Link>
			</Form>
		</div>
	);
}

