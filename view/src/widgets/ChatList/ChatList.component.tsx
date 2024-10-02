import { FC } from "react"

import ChatListSkeleton from "./ui/ChatListSkeleton.component"

import { ChatListPresenter } from "./model/ChatList.presenter"
import { ChatListState, IChatListStateObject } from "./model/ChatList.state"
import { ChatListData } from "./model/ChatList.data"
import ChatListRenderComponent from "./ChatList.render"
import { AbstractComponentProvider, IAbstractComponentProps } from "@shared/application/AbstractComponentProvider"

export default class ChatListComponent extends AbstractComponentProvider<ChatListPresenter, IChatListStateObject, ChatListState, ChatListData> {
	protected _getRenderComponent(props: IAbstractComponentProps<IChatListStateObject>): FC {
		return ChatListRenderComponent(props)
	}

	protected _getLoadingRenderComponent(): FC {
		return ChatListSkeleton
	}
}