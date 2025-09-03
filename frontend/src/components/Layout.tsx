import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Settings } from "lucide-react";

export function Layout() {
	const location = useLocation();
	const isAdmin = location.pathname === "/admin";

	return (
		<div className="h-screen flex flex-col">
			{/* ナビゲーションヘッダー */}
			<div className="border-b border-border bg-card px-4 py-2">
				<div className="flex space-x-2">
					<Button
						variant={!isAdmin ? "default" : "ghost"}
						size="sm"
						asChild
						className="h-8"
					>
						<Link to="/">
							<MessageSquare className="mr-2 h-4 w-4" />
							Chat
						</Link>
					</Button>
					<Button
						variant={isAdmin ? "default" : "ghost"}
						size="sm"
						asChild
						className="h-8"
					>
						<Link to="/admin">
							<Settings className="mr-2 h-4 w-4" />
							Admin
						</Link>
					</Button>
				</div>
			</div>

			{/* メインコンテンツ */}
			<div className="flex-1 overflow-hidden">
				<Outlet />
			</div>
		</div>
	);
}
