import { FC } from "react"

import ChatListSkeleton from "./ui/ChatListSkeleton.component"

import { ChatListPresenter } from "./model/ChatList.presenter"
import { ChatListState, IChatListStateObject } from "./model/ChatList.state"
import { ChatListData } from "./model/ChatList.data"
import ChatListRenderComponent from "./ChatList.render"
import { IAbstractComponentProps } from "@shared/application/components/AbstractComponent"
import { ReactComponent } from "@shared/application/components/ReactComponent"
import { ReactComponentRendereAdapter } from "@shared/application/adapters/ReactComponentAdapter"

class ChatListComponent extends ReactComponent<ChatListPresenter, IChatListStateObject, ChatListState, ChatListData> {
	protected _getRenderComponent(props: IAbstractComponentProps<IChatListStateObject>): FC {
		return ChatListRenderComponent(props)
	}

	protected _getLoadingRenderComponent(): FC {
		return ChatListSkeleton
	}
}

const presenter = new ChatListPresenter(new ChatListState(), new ChatListData())

const ChatListWidget = new ReactComponentRendereAdapter(new ChatListComponent(presenter))
export default ChatListWidget