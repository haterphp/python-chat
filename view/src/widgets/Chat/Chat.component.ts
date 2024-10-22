import { FC } from "react";
import { ReactComponent } from "@shared/render_core/components/ReactComponent";
import { ChatPresenter } from "./model/Chat.presenter";
import { IAbstractComponentProps, IComponentProps } from "@shared/render_core/components/AbstractComponent";
import ChatRenderComponent from "./Chat.render";
import { ChatWindowState, IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state";
import { ChatData } from "./model/Chat.data";

interface IChatComponentPayload {
	windowState: ChatWindowState
}

export default class ChatComponent extends ReactComponent<ChatPresenter, IChatWindowState, ChatWindowState, any> {

	constructor(payload: IChatComponentPayload) {
		super(new ChatPresenter(payload.windowState, new ChatData(payload.windowState)))
	}

	protected _getRenderComponent(props: IAbstractComponentProps<IChatWindowState, IComponentProps, string>): FC {
		return ChatRenderComponent(props)
	}
}