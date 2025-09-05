import { cn } from "@/lib/utils";

interface Message {
	id: string;
	content: string;
	role: "user" | "assistant";
	timestamp: Date;
}

interface ChatMessageProps {
	message: Message;
	isLoading?: boolean;
}

export function ChatMessage({ message, isLoading = false }: ChatMessageProps) {
	const isUser = message.role === "user";

	return (
		<div
			className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
		>
			<div
				className={cn(
					"max-w-[80%] rounded-2xl px-4 py-2",
					isUser
						? "bg-primary text-primary-foreground"
						: "bg-muted text-muted-foreground",
				)}
			>
				{isLoading ? (
					<div className="flex items-center space-x-2">
						<div className="flex space-x-1">
							<div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
							<div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
							<div className="h-2 w-2 animate-bounce rounded-full bg-current" />
						</div>
					</div>
				) : (
					<div className="whitespace-pre-wrap text-sm">{message.content}</div>
				)}
			</div>
		</div>
	);
}
