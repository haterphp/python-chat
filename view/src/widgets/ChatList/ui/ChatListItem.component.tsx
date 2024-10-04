import Avatar from "@app/components/avatar/Avatar.component"
import { TextColors } from "@app/components/common/Colors"
import { ChatSchema } from "@data/chats/schemas/ChatSchema"

interface IChatListItemProps {
	chat: ChatSchema
	onClick: (chatId: ChatSchema['id']) => void
}

export default function ChatListitem(props: IChatListItemProps) {
	const { chat, onClick: handleOnChatItemClick } = props

	const handleOnClick = () => {
		handleOnChatItemClick(chat.id)
	}

	return (
		<div className="chats_list__item" onClick={handleOnClick}>
			<Avatar text={chat.name.charAt(0)} />

			<div className="content">
				<h4 className="title">{chat.name}</h4>
				<p className={['message', TextColors.COMMON].join(' ')}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ipsum?</p>
			</div>
		</div>
	)
}