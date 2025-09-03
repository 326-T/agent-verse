import { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

interface Message {
	id: string;
	content: string;
	role: "user" | "assistant";
	timestamp: Date;
}

export function ChatUI() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			content: "Hello! I'm an AI assistant. How can I help you today?",
			role: "assistant",
			timestamp: new Date(),
		},
	]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSendMessage = async (content: string) => {
		const userMessage: Message = {
			id: Date.now().toString(),
			content,
			role: "user",
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			const assistantMessage: Message = {
				id: (Date.now() + 1).toString(),
				content:
					"I'm a demo assistant. In a real application, this would be connected to your backend API.",
				role: "assistant",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, assistantMessage]);
			setIsLoading(false);
		}, 1000);
	};

	return (
		<div className="flex h-full flex-col bg-background">
			{/* Messages */}
			<div className="flex-1 overflow-hidden">
				<div className="h-full overflow-y-auto px-4 py-4">
					<div className="mx-auto max-w-3xl space-y-4">
						{messages.map((message) => (
							<ChatMessage key={message.id} message={message} />
						))}
						{isLoading && (
							<ChatMessage
								message={{
									id: "loading",
									content: "",
									role: "assistant",
									timestamp: new Date(),
								}}
								isLoading={true}
							/>
						)}
					</div>
				</div>
			</div>

			{/* Input */}
			<div className="border-t border-border bg-background p-4">
				<div className="mx-auto max-w-3xl">
					<ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
				</div>
			</div>
		</div>
	);
}
