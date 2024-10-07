import { ReactComponent } from "@shared/render_core/components/ReactComponent";
import { IAbstractComponentProps } from "@shared/render_core/components/AbstractComponent";
import { FC } from "react";
import { ChatWindowPresenter } from "./model/ChatWindow.presenter";
import { ChatWindowState } from "./model/ChatWindow.state";
import ChatWindowRenderComponent from "./ChatWindow.render";

export default class ChatWindowComponent extends ReactComponent<ChatWindowPresenter, {}, ChatWindowState, any> {
	constructor() {
		super(new ChatWindowPresenter(new ChatWindowState()))
	}

	protected _getRenderComponent(props: IAbstractComponentProps<{}>): FC {
		return ChatWindowRenderComponent(props)
	}
}