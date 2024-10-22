import { useLifeCycleComponent } from "@widgets/ReactRender/useLifeCycleComponent";
import { useState } from "react";
import ChatListitem from "./ui/ChatListItem.component";
import { IAbstractComponentProps } from "@shared/render_core/components/AbstractComponent";
import { ChatSchema } from "@widgets/ChatCommon/ChatSchema";
import { ChatListEventEmitterKeys } from "./model/ChatList.presenter";
import { IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state";

export default function ChatListRenderComponent(props: IAbstractComponentProps<IChatWindowState, {}, ChatListEventEmitterKeys>) {
	return () => {
		const { subscribeToStateChanges, subscribeToStateKeyChanges } = props

		const [chatsList, setChatLists] = useState<IChatWindowState['chats']>([])

		useLifeCycleComponent(
			props,
			() => {
				subscribeToStateChanges((state) => {
					if (state.chats.length > 0) setChatLists(state.chats)
				})
				subscribeToStateKeyChanges('chats', setChatLists)
			}
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