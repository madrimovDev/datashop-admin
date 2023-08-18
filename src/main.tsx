import { createRoot } from "react-dom/client";
import { RootProvider } from "./app";
import "./index.css";

const rootContainer = document.getElementById("root") as HTMLDivElement;
const root = createRoot(rootContainer);

root.render(<RootProvider />);

