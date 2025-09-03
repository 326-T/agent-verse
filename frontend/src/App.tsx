import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ChatUI } from "./components/ChatUI";
import { AdminPage } from "./components/AdminPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<ChatUI />} />
					<Route path="admin" element={<AdminPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
