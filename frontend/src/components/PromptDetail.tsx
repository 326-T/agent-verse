import { Button } from "@/components/ui/button";
import { Copy, Edit, Save, X } from "lucide-react";
import { useState } from "react";
import type { Prompt } from "./AdminPage";

interface PromptDetailProps {
	prompt: Prompt;
}

export function PromptDetail({ prompt }: PromptDetailProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedContent, setEditedContent] = useState(prompt.content);
	const [editedName, setEditedName] = useState(prompt.name);
	const [editedDescription, setEditedDescription] = useState(
		prompt.description,
	);

	const handleSave = () => {
		// 実際のアプリケーションではここでAPIを呼び出してデータを保存
		console.log("Saving prompt:", {
			id: prompt.id,
			name: editedName,
			description: editedDescription,
			content: editedContent,
		});
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditedName(prompt.name);
		setEditedDescription(prompt.description);
		setEditedContent(prompt.content);
		setIsEditing(false);
	};

	const handleCopyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(prompt.content);
			// 実際のアプリケーションではトーストやスナックバーで成功メッセージを表示
			console.log("Copied to clipboard");
		} catch (err) {
			console.error("Failed to copy to clipboard:", err);
		}
	};

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("ja-JP", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	};

	return (
		<div className="flex h-full flex-col">
			{/* ヘッダー */}
			<div className="border-b border-border bg-card px-6 py-4">
				<div className="flex items-center justify-between">
					<div className="flex-1">
						{isEditing ? (
							<input
								value={editedName}
								onChange={(e) => setEditedName(e.target.value)}
								className="text-xl font-semibold bg-background border border-input rounded-md px-3 py-1 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
							/>
						) : (
							<h1 className="text-xl font-semibold">{prompt.name}</h1>
						)}
						{isEditing ? (
							<input
								value={editedDescription}
								onChange={(e) => setEditedDescription(e.target.value)}
								placeholder="Description..."
								className="mt-2 text-sm text-muted-foreground bg-background border border-input rounded-md px-3 py-1 w-full focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
							/>
						) : (
							<p className="mt-1 text-sm text-muted-foreground">
								{prompt.description}
							</p>
						)}
					</div>
					<div className="flex items-center space-x-2">
						{isEditing ? (
							<>
								<Button size="sm" onClick={handleSave} className="h-8">
									<Save className="mr-2 h-4 w-4" />
									Save
								</Button>
								<Button
									size="sm"
									variant="outline"
									onClick={handleCancel}
									className="h-8"
								>
									<X className="mr-2 h-4 w-4" />
									Cancel
								</Button>
							</>
						) : (
							<>
								<Button
									size="sm"
									variant="outline"
									onClick={handleCopyToClipboard}
									className="h-8"
								>
									<Copy className="mr-2 h-4 w-4" />
									Copy
								</Button>
								<Button
									size="sm"
									onClick={() => setIsEditing(true)}
									className="h-8"
								>
									<Edit className="mr-2 h-4 w-4" />
									Edit
								</Button>
							</>
						)}
					</div>
				</div>
			</div>

			{/* メインコンテンツ */}
			<div className="flex-1 overflow-y-auto p-6">
				<div className="space-y-6">
					{/* タグ */}
					<div>
						<h3 className="text-sm font-medium text-muted-foreground mb-2">
							Tags
						</h3>
						<div className="flex flex-wrap gap-2">
							{prompt.tags.map((tag) => (
								<span
									key={tag}
									className="inline-block rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
								>
									{tag}
								</span>
							))}
						</div>
					</div>

					{/* プロンプト内容 */}
					<div>
						<h3 className="text-sm font-medium text-muted-foreground mb-2">
							Prompt Content
						</h3>
						{isEditing ? (
							<textarea
								value={editedContent}
								onChange={(e) => setEditedContent(e.target.value)}
								className="w-full min-h-[300px] resize-none rounded-lg border border-input bg-background p-4 text-sm font-mono focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
								placeholder="Enter your prompt content here..."
							/>
						) : (
							<div className="rounded-lg border border-border bg-muted/30 p-4">
								<pre className="whitespace-pre-wrap text-sm font-mono">
									{prompt.content}
								</pre>
							</div>
						)}
					</div>

					{/* メタデータ */}
					<div className="grid grid-cols-2 gap-6">
						<div>
							<h3 className="text-sm font-medium text-muted-foreground mb-2">
								Created
							</h3>
							<p className="text-sm">{formatDate(prompt.createdAt)}</p>
						</div>
						<div>
							<h3 className="text-sm font-medium text-muted-foreground mb-2">
								Last Updated
							</h3>
							<p className="text-sm">{formatDate(prompt.updatedAt)}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
