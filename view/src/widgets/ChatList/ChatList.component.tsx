import { FC } from "react"

import ChatListSkeleton from "./ui/ChatListSkeleton.component"
import ChatListRenderComponent from "./ChatList.render"

import { ChatListPresenter } from "./model/ChatList.presenter"
import { ChatListData } from "./model/ChatList.data"
import { IAbstractComponentProps } from "@shared/render_core/components/AbstractComponent"
import { ReactComponent } from "@shared/render_core/components/ReactComponent"
import { ChatWindowState, IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state"

interface IChatListComponentPayload {
	windowState: ChatWindowState
}

export default class ChatListComponent extends ReactComponent<ChatListPresenter, IChatWindowState, ChatWindowState, ChatListData> {

	constructor(payload: IChatListComponentPayload) {
		super(new ChatListPresenter(payload.windowState, new ChatListData(payload.windowState)))
	}

	protected _getRenderComponent(props: IAbstractComponentProps<IChatWindowState>): FC {
		return ChatListRenderComponent(props)
	}

	protected _getLoadingRenderComponent(): FC {
		return ChatListSkeleton
	}

}