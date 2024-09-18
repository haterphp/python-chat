import { ChatSchema } from "@data/chats/schemas/ChatSchema"

interface IChatListItemProps {
	chat: ChatSchema
}

export default function ChatListitem(props: IChatListItemProps) {
	const { chat } = props

	return (
		<div className="chats_list__item">
			{chat.id}
		</div>
	)
}