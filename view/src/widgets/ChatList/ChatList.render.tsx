import { useLifeCycleComponent } from "@widgets/ReactRender/useLifeCycleComponent";
import { useState } from "react";
import ChatListitem from "./ui/ChatListItem.component";
import { IAbstractComponentProps } from "@shared/Core/render_core/components/AbstractComponent";
import { IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state";
import { StateKeyChangesSubsriber } from "@shared/Core/common/state/StateKeyChangesSubscriber";
import { StateChangesSubsriber } from "@shared/Core/common/state/StateChangesSubsriber";
import { ChatListSubsribersEnum } from "./model/subsribers/ChatListSubsribers.enum";
import { ChatSchema } from "@shared/ChatCommon/schemas/ChatSchema";

export default function ChatListRenderComponent(props: IAbstractComponentProps<IChatWindowState, {}, ChatListSubsribersEnum>) {
	return () => {
		const { subscribeToStateChanges, subscribeToStateKeyChanges } = props

		const [chatsList, setChatLists] = useState<IChatWindowState['chats']>([])
		const [selectedChatId, setSelectedChatId] = useState<ChatSchema['id']>(-1)

		useLifeCycleComponent(
			props,
			() => {
				subscribeToStateChanges(
					new StateChangesSubsriber((state) => {
						if (state.chats.length > 0) setChatLists(state.chats)
					})
				)
				subscribeToStateKeyChanges(
					new StateKeyChangesSubsriber('chats', setChatLists)
				)
				subscribeToStateKeyChanges(
					new StateKeyChangesSubsriber('selectedChat', onSelectedChat)
				)
			}
		)

		const onSelectedChat = (selectedChat: ChatSchema | null) => {
			setSelectedChatId(selectedChat === null ? -1 : selectedChat.id)
		}

		const handleOnChatItemClick = (chatId: ChatSchema['id']) => {
			props.emitAction(ChatListSubsribersEnum.SET_SELECTED_CHAT, chatId)
		}

		return (
			<div className="chats_list">
				{chatsList.map((chat) => (
					<ChatListitem
						key={chat.id}
						chat={chat}
						isSelected={selectedChatId === chat.id}
						onClick={handleOnChatItemClick}
					/>
				))}
			</div>
		)
	}
}