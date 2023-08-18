import { Navigate, createBrowserRouter } from "react-router-dom";
import { RequireAuth, Register, Login, Verification } from "../../pages";
import Layout from "../../components/layout/layout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RequireAuth />,
		children: [
			{
				path: "/",
				element: <Layout />,
			},
		],
	},
	{
		path: "/auth",
		element: <Navigate to="/auth/login" />,
	},
	{
		path: "/auth/login",
		element: <Login />,
	},
	{
		path: "/auth/register",
		element: <Register />,
	},
	{
		path: "/auth/verification",
		element: <Verification />,
	},
]);

export default router;


