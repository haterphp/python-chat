import { Presenter } from "../../../shared/common/Presenter";

import { ChatListState, IChatListStateObject } from "./ChatList.state";
import { ChatListData } from "./ChatList.data";
import { ComponentState } from "@shared/application/ComponentState";

export class ChatListPresenter extends Presenter<IChatListStateObject, ChatListState, ChatListData> {
	public mount(componentState: ComponentState): void {
		this._state.subscribeToStateKeyChanges('chatsList', (data) => console.log(data))
		super.mount(componentState)
	}
}