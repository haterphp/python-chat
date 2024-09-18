import { FC } from "react";
import { AbstractPresenter, IAbstractComponentProps } from "@data/common/components/Presenter";

import { ChatListState, IChatListStateObject } from "./ChatList.state";
import { ChatListData } from "./ChatList.data";

import ChatListRenderComponent from "../ChatList.render";

export class ChatListPresenter extends AbstractPresenter<ChatListState, ChatListData, IChatListStateObject> {

	protected _getRenderComponent(props: IAbstractComponentProps<IChatListStateObject>): FC {
		return ChatListRenderComponent(props)
	}

}