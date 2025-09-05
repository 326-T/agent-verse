import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
	onSendMessage: (message: string) => void;
	disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
	const [message, setMessage] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim() && !disabled) {
			onSendMessage(message.trim());
			setMessage("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex items-center space-x-2">
			<textarea
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="Type your message here..."
				disabled={disabled}
				rows={1}
				className="min-h-[44px] max-h-32 w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
				style={{
					height: "auto",
					minHeight: "44px",
				}}
				onInput={(e) => {
					const target = e.target as HTMLTextAreaElement;
					target.style.height = "auto";
					target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
				}}
			/>
			<Button
				type="submit"
				size="icon"
				disabled={!message.trim() || disabled}
				className="h-11 w-11 shrink-0"
			>
				<Send className="h-4 w-4" />
				<span className="sr-only">Send message</span>
			</Button>
		</form>
	);
}
