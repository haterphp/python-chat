import { IChatListStateObject } from "./model/ChatList.state";
import { useLifeCycleComponent } from "@widgets/ReactRender/useLifeCycleComponent";
import { useState } from "react";
import ChatListitem from "./ui/ChatListItem.component";
import { IAbstractComponentProps } from "@shared/render_core/components/AbstractComponent";
import { ChatSchema } from "@data/chats/schemas/ChatSchema";
import { ChatListEventEmitterKeys } from "./model/ChatList.presenter";

export default function ChatListRenderComponent(props: IAbstractComponentProps<IChatListStateObject, {}, ChatListEventEmitterKeys>) {
	return () => {
		const [chatsList, setChatLists] = useState<IChatListStateObject['chatsList']>([])

		const loadDataState = (state: IChatListStateObject) => {
			if (state.chatsList.length > 0) setChatLists(state.chatsList)
		}

		useLifeCycleComponent(
			props,
			loadDataState,
			[['chatsList', setChatLists]]
		)

		const handleOnChatItemClick = (chatId: ChatSchema['id']) => {
			props.emitAction('setCurrentChat', chatId)
		}

		return (
			<div className="chats_list">
				{chatsList.map((chat) => <ChatListitem key={chat.id} chat={chat} onClick={handleOnChatItemClick} />)}
			</div>
		)
	}
}