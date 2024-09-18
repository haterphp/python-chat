import { FC } from "react";
import { AbstractPresenter, IAbstractComponentProps } from "@data/common/components/Presenter";
import { ChatWindowState } from "./ChatWindow.state";
import ChatWindowRenderComponent from "../ChatWindow.render";

export class ChatWindowPresenter extends AbstractPresenter<ChatWindowState> {

	protected _getRenderComponent(props: IAbstractComponentProps): FC {
		return ChatWindowRenderComponent(props)
	}
}