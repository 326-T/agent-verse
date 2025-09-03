import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatUI } from "./components/ChatUI";
import { AdminPage } from "./components/AdminPage";
import { MessageSquare, Settings } from "lucide-react";

type TabType = "chat" | "admin";

function App() {
	const [activeTab, setActiveTab] = useState<TabType>("chat");

	return (
		<div className="h-screen flex flex-col">
			{/* タブナビゲーション */}
			<div className="border-b border-border bg-card px-4 py-2">
				<div className="flex space-x-2">
					<Button
						variant={activeTab === "chat" ? "default" : "ghost"}
						size="sm"
						onClick={() => setActiveTab("chat")}
						className="h-8"
					>
						<MessageSquare className="mr-2 h-4 w-4" />
						Chat
					</Button>
					<Button
						variant={activeTab === "admin" ? "default" : "ghost"}
						size="sm"
						onClick={() => setActiveTab("admin")}
						className="h-8"
					>
						<Settings className="mr-2 h-4 w-4" />
						Admin
					</Button>
				</div>
			</div>

			{/* メインコンテンツ */}
			<div className="flex-1 overflow-hidden">
				{activeTab === "chat" ? <ChatUI /> : <AdminPage />}
			</div>
		</div>
	);
}

export default App;
