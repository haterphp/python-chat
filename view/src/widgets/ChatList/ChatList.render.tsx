import { IChatListStateObject } from "./model/ChatList.state";
import { useLifeCycleComponent } from "@widgets/ReactRender/useLifeCycleComponent";
import { useState } from "react";
import ChatListitem from "./ui/ChatListItem.component";
import { IAbstractComponentProps } from "@shared/render_core/components/AbstractComponent";
import { ChatSchema } from "@data/chats/schemas/ChatSchema";

export default function ChatListRenderComponent(props: IAbstractComponentProps<IChatListStateObject>) {
	return () => {
		const [chatsList, setChatLists] = useState<IChatListStateObject['chatsList']>([])

		const { emitAction } = props

		const loadDataState = (state: IChatListStateObject) => {
			console.log(state)
			if (state.chatsList.length > 0) setChatLists(state.chatsList)
		}

		const beforeMount = () => {
			props.subscribeToStateChanges(loadDataState)
			props.subscribeToStateKeyChanges('chatsList', setChatLists)
		}

		useLifeCycleComponent(props, { beforeMount })

		const handleOnChatItemClick = (chatId: ChatSchema['id']) => {
			emitAction('CALL_FROM_REACT', chatId)
		}

		return (
			<div className="chats_list">
				{chatsList.map((chat) => <ChatListitem key={chat.id} chat={chat} onClick={handleOnChatItemClick} />)}
			</div>
		)
	}
}