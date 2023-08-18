import { StyleProvider } from "@ant-design/cssinjs";
import { Provider } from "react-redux";
import { store } from "../store";
import { RouterProvider } from "react-router-dom";
import { router } from "../router";

export default function RootProvider() {
	return (
		<StyleProvider hashPriority="high">
			<Provider store={store}>
				<RouterProvider
					router={router}
					future={{ v7_startTransition: true }}
				/>
			</Provider>
		</StyleProvider>
	);
}

