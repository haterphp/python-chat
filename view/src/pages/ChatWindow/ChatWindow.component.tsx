import { ReactComponent } from "@shared/render_core/components/ReactComponent";
import { IAbstractComponentProps, IComponentProps } from "@shared/render_core/components/AbstractComponent";
import { FC } from "react";
import { ChatWindowPresenter } from "./model/ChatWindow.presenter";
import { ChatWindowState } from "./model/ChatWindow.state";
import ChatWindowRenderComponent from "./ChatWindow.render";
import ChatListComponent from "@widgets/ChatList/ChatList.component";

export interface IChatWindowComponentProps extends IComponentProps {
	ChatWindowListComponent: ChatListComponent
}

export default class ChatWindowComponent extends ReactComponent<ChatWindowPresenter, {}, ChatWindowState, any, IChatWindowComponentProps> {
	constructor() {
		super(new ChatWindowPresenter(new ChatWindowState()))
	}

	protected _getComponentsProps(): IChatWindowComponentProps {
		return {
			ChatWindowListComponent: new ChatListComponent({
				setCurrentChat: this._presenter.setCurrentChat.bind(this._presenter)
			})
		}
	}

	protected _getRenderComponent(props: IAbstractComponentProps<{}, IChatWindowComponentProps>): FC {
		return ChatWindowRenderComponent(props)
	}
}