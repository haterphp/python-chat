import { FC } from "react"

import ChatListSkeleton from "./ui/ChatListSkeleton.component"
import ChatListRenderComponent from "./ChatList.render"

import { ChatListPresenter } from "./model/ChatList.presenter"
import { ChatListState, IChatListStateObject } from "./model/ChatList.state"
import { ChatListData } from "./model/ChatList.data"
import { IAbstractComponentProps } from "@shared/render_core/components/AbstractComponent"
import { ReactComponent } from "@shared/render_core/components/ReactComponent"
import { ChatSchema } from "@data/chats/schemas/ChatSchema"

interface IChatListComponentPayload {
	setCurrentChat: (chat: ChatSchema) => void
}

class ChatListComponent extends ReactComponent<ChatListPresenter, IChatListStateObject, ChatListState, ChatListData> {
	constructor(payload: IChatListComponentPayload) {
		const presenter = new ChatListPresenter(
			new ChatListState(),
			new ChatListData(),
			{ setCurrentChat: payload.setCurrentChat}
		)

		super(presenter)
	}

	protected _getRenderComponent(props: IAbstractComponentProps<IChatListStateObject>): FC {
		return ChatListRenderComponent(props)
	}

	protected _getLoadingRenderComponent(): FC {
		return ChatListSkeleton
	}
}
export default ChatListComponent