import { Button, Form, Input, Typography, notification } from "antd";
import { ApiError } from "../app/store/types";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../app/config";

export default function Register() {
	const navigate = useNavigate();
	const onFinish = async (data: {
		email: string;
		password: string;
		name: string;
		phone: string;
		surname: string;
		address: string;
	}) => {
		try {
			const response = await api.post("/auth/register", data);

			Object.keys(response.data).forEach((key) => {
				if (key !== "message") {
					localStorage.setItem(key, response.data[key]);
				}
			});
			localStorage.setItem("startingTime", JSON.stringify(Date.now()));
			navigate("/auth/verification", {
				state: {
					verifying: true,
				},
			});
		} catch (e) {
			notification.error({
				message: (e as ApiError).response?.data.message,
			});
		}
	};
	return (
		<div className="h-screen grid place-items-center">
			<Form
				autoComplete="off"
				autoCorrect="off"
				layout="vertical"
				onFinish={onFinish}
				className="max-w-sm w-full"
			>
				<Typography.Title level={3}>Ro'yhatdan o'tish</Typography.Title>
				<Form.Item
					name="name"
					label="Name"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="surname"
					label="Surname"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="phone"
					label="Phone"
					rules={[
						{
							required: true,
							type: "string",
						},
					]}
				>
					<Input
						inputMode="text"
						className="!w-full"
						maxLength={9}
						addonBefore={"+998"}
					/>
				</Form.Item>
				<Form.Item
					label="Address"
					name="address"
					rules={[{ required: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Email"
					name="email"
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
						Ro'yhatdan o'tish
					</Button>
				</Form.Item>
				<Link to="/auth/login">Kirish</Link>
			</Form>
		</div>
	);
}

