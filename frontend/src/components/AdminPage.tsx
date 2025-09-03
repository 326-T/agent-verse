import { useState } from "react";
import { PromptSidebar } from "./PromptSidebar";
import { PromptDetail } from "./PromptDetail";

export interface Prompt {
	id: string;
	name: string;
	content: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	tags: string[];
}

// サンプルデータ
const SAMPLE_PROMPTS: Prompt[] = [
	{
		id: "1",
		name: "Customer Support Assistant",
		content:
			"You are a helpful customer support assistant. Always be polite and professional. If you don't know the answer, escalate to a human agent.",
		description: "カスタマーサポート用のアシスタントプロンプト",
		createdAt: new Date("2024-01-15"),
		updatedAt: new Date("2024-01-20"),
		tags: ["support", "customer-service"],
	},
	{
		id: "2",
		name: "Code Review Assistant",
		content:
			"You are an expert code reviewer. Analyze the provided code for:\n- Security vulnerabilities\n- Performance issues\n- Best practices\n- Code readability\n\nProvide constructive feedback with specific suggestions for improvement.",
		description: "コードレビューを行うAIアシスタント",
		createdAt: new Date("2024-01-10"),
		updatedAt: new Date("2024-01-18"),
		tags: ["development", "code-review", "technical"],
	},
	{
		id: "3",
		name: "Content Writer",
		content:
			"You are a creative content writer specializing in blog posts and marketing copy. Write engaging, SEO-friendly content that resonates with the target audience.",
		description: "ブログ記事やマーケティング用コンテンツの作成",
		createdAt: new Date("2024-01-05"),
		updatedAt: new Date("2024-01-22"),
		tags: ["content", "marketing", "writing"],
	},
	{
		id: "4",
		name: "Data Analysis Assistant",
		content:
			"You are a data analysis expert. Help users interpret data, create visualizations, and provide insights. Always explain your methodology and assumptions clearly.",
		description: "データ分析とインサイト提供を行うアシスタント",
		createdAt: new Date("2024-01-12"),
		updatedAt: new Date("2024-01-25"),
		tags: ["data", "analysis", "visualization"],
	},
	{
		id: "5",
		name: "Language Tutor",
		content:
			"You are a patient language tutor. Help users learn new languages by providing explanations, corrections, and practice exercises. Adapt your teaching style to the user's level.",
		description: "言語学習をサポートする教師アシスタント",
		createdAt: new Date("2024-01-08"),
		updatedAt: new Date("2024-01-19"),
		tags: ["education", "language", "tutoring"],
	},
];

export function AdminPage() {
	const [prompts] = useState<Prompt[]>(SAMPLE_PROMPTS);
	const [selectedPromptId, setSelectedPromptId] = useState<string | null>(
		prompts[0]?.id || null,
	);

	const selectedPrompt = prompts.find((p) => p.id === selectedPromptId);

	return (
		<div className="flex h-full bg-background">
			{/* サイドバー */}
			<div className="w-80 border-r border-border bg-card">
				<PromptSidebar
					prompts={prompts}
					selectedPromptId={selectedPromptId}
					onSelectPrompt={setSelectedPromptId}
				/>
			</div>

			{/* メインコンテンツ */}
			<div className="flex-1 overflow-hidden">
				{selectedPrompt ? (
					<PromptDetail prompt={selectedPrompt} />
				) : (
					<div className="flex h-full items-center justify-center text-muted-foreground">
						プロンプトを選択してください
					</div>
				)}
			</div>
		</div>
	);
}
