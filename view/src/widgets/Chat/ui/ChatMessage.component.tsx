import { ChatMessageSchema } from "@shared/ChatCommon/schemas/ChatMessageSchema"
import { useMemo } from "react"

interface IChatMessageProps {
	message: ChatMessageSchema
}

export default function ChatMessage(props: IChatMessageProps) {
	const { message } = props

	const containerClassName = useMemo(() => [
		'chat_message',
		true && 'chat_message-own'
	].filter(item => typeof item === 'string').join(' '), [])

	return (
		<div className={containerClassName}>
			<p className="chat_message__content">{message.content}</p>
			{/* <span className="chat_message__time"></span> */}
		</div>
	)
}