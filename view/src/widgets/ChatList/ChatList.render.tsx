import { useLifeCycleComponent } from "@widgets/ReactRender/useLifeCycleComponent";
import { useState } from "react";
import ChatListitem from "./ui/ChatListItem.component";
import { IAbstractComponentProps } from "@shared/render_core/components/AbstractComponent";
import { ChatSchema } from "@widgets/ChatCommon/ChatSchema";
import { IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state";
import { StateKeyChangesSubsriber } from "@shared/common/state/StateKeyChangesSubscriber";
import { StateChangesSubsriber } from "@shared/common/state/StateChangesSubsriber";
import { ChatListSubsribersEnum } from "./model/subsribers/ChatListSubsribers.enum";

export default function ChatListRenderComponent(props: IAbstractComponentProps<IChatWindowState, {}, ChatListSubsribersEnum>) {
	return () => {
		const { subscribeToStateChanges, subscribeToStateKeyChanges } = props

		const [chatsList, setChatLists] = useState<IChatWindowState['chats']>([])

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
			}
		)

		const handleOnChatItemClick = (chatId: ChatSchema['id']) => {
			props.emitAction(ChatListSubsribersEnum.SET_SELECTED_CHAT, chatId)
		}

		return (
			<div className="chats_list">
				{chatsList.map((chat) => <ChatListitem key={chat.id} chat={chat} onClick={handleOnChatItemClick} />)}
			</div>
		)
	}
}