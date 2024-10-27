import { ReactComponent } from "@shared/Core/render_core/components/ReactComponent";
import { IAbstractComponentProps, IComponentProps } from "@shared/Core/render_core/components/AbstractComponent";
import { FC } from "react";
import { ChatWindowPresenter } from "./model/ChatWindow.presenter";
import { ChatWindowState, IChatWindowState } from "./model/ChatWindow.state";
import ChatWindowRenderComponent from "./ChatWindow.render";

import ChatListComponent from "@widgets/ChatList/ChatList.component";
import ChatComponent from "@widgets/Chat/Chat.component";

export interface IChatWindowComponentProps extends IComponentProps {
	ChatWindowListComponent: ChatListComponent
	ChatComponent: ChatComponent
}

export default class ChatWindowComponent extends ReactComponent<ChatWindowPresenter, IChatWindowState, ChatWindowState, any, IChatWindowComponentProps> {

	private __windowState: ChatWindowState

	constructor() {
		const windowState = new ChatWindowState()

		super(new ChatWindowPresenter(windowState))

		this.__windowState = windowState
	}

	protected _getComponentsProps(): IChatWindowComponentProps {
		const payload = { windowState: this.__windowState }

		return {
			ChatWindowListComponent: new ChatListComponent(payload),
			ChatComponent: new ChatComponent(payload)
		}
	}

	protected _getRenderComponent(props: IAbstractComponentProps<IChatWindowState, IChatWindowComponentProps>): FC {
		return ChatWindowRenderComponent(props)
	}

}