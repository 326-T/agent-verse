import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import type { Prompt } from "./AdminPage";

interface PromptSidebarProps {
	prompts: Prompt[];
	selectedPromptId: string | null;
	onSelectPrompt: (id: string) => void;
}

export function PromptSidebar({
	prompts,
	selectedPromptId,
	onSelectPrompt,
}: PromptSidebarProps) {
	return (
		<div className="flex h-full flex-col">
			{/* ヘッダー */}
			<div className="border-b border-border p-4">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold">Prompts</h2>
					<Button size="sm" className="h-8 w-8" variant="outline">
						<Plus className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* 検索バー */}
			<div className="border-b border-border p-4">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<input
						type="text"
						placeholder="Search prompts..."
						className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
					/>
				</div>
			</div>

			{/* プロンプト一覧 */}
			<div className="flex-1 overflow-y-auto">
				<div className="p-2">
					{prompts.map((prompt) => (
						<button
							key={prompt.id}
							type="button"
							onClick={() => onSelectPrompt(prompt.id)}
							className={cn(
								"w-full rounded-lg p-3 text-left transition-colors hover:bg-accent",
								selectedPromptId === prompt.id
									? "bg-accent text-accent-foreground"
									: "text-foreground",
							)}
						>
							<div className="flex flex-col space-y-1">
								<div className="font-medium line-clamp-1">{prompt.name}</div>
								<div className="text-xs text-muted-foreground line-clamp-2">
									{prompt.description}
								</div>
								<div className="flex flex-wrap gap-1 mt-2">
									{prompt.tags.slice(0, 2).map((tag) => (
										<span
											key={tag}
											className="inline-block rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
										>
											{tag}
										</span>
									))}
									{prompt.tags.length > 2 && (
										<span className="text-xs text-muted-foreground">
											+{prompt.tags.length - 2}
										</span>
									)}
								</div>
							</div>
						</button>
					))}
				</div>
			</div>

			{/* フッター */}
			<div className="border-t border-border p-4">
				<div className="text-xs text-muted-foreground">
					{prompts.length} prompts total
				</div>
			</div>
		</div>
	);
}
