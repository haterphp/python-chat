import { FC } from "react"

import ChatListSkeleton from "./ui/ChatListSkeleton.component"

import { ChatListPresenter } from "./model/ChatList.presenter"
import { ChatListState, IChatListStateObject } from "./model/ChatList.state"
import { ChatListData } from "./model/ChatList.data"
import ChatListRenderComponent from "./ChatList.render"
import { IAbstractComponentProps } from "@shared/render_core/components/AbstractComponent"
import { ReactComponent } from "@shared/render_core/components/ReactComponent"

class ChatListComponent extends ReactComponent<ChatListPresenter, IChatListStateObject, ChatListState, ChatListData> {
	constructor() {
		super(new ChatListPresenter(new ChatListState(), new ChatListData()))
	}

	protected _getRenderComponent(props: IAbstractComponentProps<IChatListStateObject>): FC {
		return ChatListRenderComponent(props)
	}

	protected _getLoadingRenderComponent(): FC {
		return ChatListSkeleton
	}
}
export default ChatListComponent