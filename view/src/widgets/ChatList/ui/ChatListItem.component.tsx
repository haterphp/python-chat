import Avatar from "@app/components/avatar/Avatar.component"
import { TextColors } from "@app/components/common/Colors"
import { ChatSchema } from "@shared/ChatCommon/schemas/ChatSchema"
import { useMemo } from "react"

interface IChatListItemProps {
	chat: ChatSchema
	isSelected: boolean
	onClick: (chatId: ChatSchema['id']) => void
}

export default function ChatListitem(props: IChatListItemProps) {
	const { chat, isSelected,  onClick: handleOnChatItemClick } = props

	const containerClassName = useMemo(() => [
		'chats_list__item',
		isSelected && 'chats_list__item-active'
	].filter(item => typeof item === 'string').join(' '), [isSelected])

	const handleOnClick = () => {
		handleOnChatItemClick(chat.id)
	}

	return (
		<div className={containerClassName} onClick={handleOnClick}>
			<Avatar text={chat.name.charAt(0)} />

			<div className="content">
				<h4 className="title">{chat.name}</h4>
				<p className={['message', TextColors.COMMON].join(' ')}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ipsum?</p>
			</div>
		</div>
	)
}