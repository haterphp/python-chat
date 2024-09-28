import { IAbstractComponentProps } from "../../shared/common/Presenter";
import { IChatListStateObject } from "./model/ChatList.state";
import { useLifeCycleComponent } from "@widgets/LifeCycle/useLifeCycleComponent";
import { useState } from "react";
import ChatListitem from "./ui/ChatListItem.component";

export default function ChatListRenderComponent(props: IAbstractComponentProps<IChatListStateObject>) {
	return () => {
		const [chatsList, setChatLists] = useState<IChatListStateObject['chatsList']>([])

		const loadDataState = (state: IChatListStateObject) => {
			if (state.chatsList.length > 0) setChatLists(state.chatsList)
		}

		const beforeMount = () => {
			props.subscribeToStateChanges(loadDataState)
			props.subscribeToStateKeyChanges('chatsList', setChatLists)
		}

		useLifeCycleComponent(props, { beforeMount })

		return (
			<div className="chats_list">
				{chatsList.map((chat) => <ChatListitem key={chat.id} chat={chat} />)}
			</div>
		)
	}
}