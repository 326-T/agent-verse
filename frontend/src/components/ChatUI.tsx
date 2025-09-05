import { useEffect, useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import useWebSocket from "react-use-websocket";

interface MessageState {
	should_continue: boolean;
	should_escalate: boolean;
	selected_agent: string | null;
	selected_agent_id: string | null;
	selected_agent_evaluation: string | null;
	messages: any[];
}

interface ClientPayload {
	name: "user" | "operator";
	content: string;
}

interface Envelop {
	payload: MessageState | ClientPayload;
}

export function ChatUI() {
	const { sendMessage, lastMessage } = useWebSocket(
		"ws://localhost:8000/ws/text",
	);
	const [isLoading, setIsLoading] = useState(false);
	const [messageState, setMessageState] = useState<MessageState | null>(null);
	useEffect(() => {
		if (lastMessage) {
			console.log("Received message:", lastMessage.data);
			const newState: Envelop = JSON.parse(lastMessage.data);
			setMessageState(newState.payload as MessageState);
			setIsLoading(false);
		}
	}, [lastMessage]);
	const handleSendMessage = (content: string) => {
		const envelop: Envelop = {
			payload: {
				name: "user",
				content,
			},
		};
		sendMessage(JSON.stringify(envelop));
		setIsLoading(true);
	};

	return (
		<div className="flex h-full flex-col bg-background">
			{/* Messages */}
			<div className="flex-1 overflow-hidden">
				<div className="h-full overflow-y-auto px-4 py-4">
					<div className="mx-auto max-w-3xl space-y-4">
						{messageState?.messages.map((message) => (
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
