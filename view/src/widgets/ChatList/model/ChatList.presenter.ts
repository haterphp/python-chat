import { Presenter } from "../../../shared/render_core/Presenter";

import { ChatListState, IChatListStateObject } from "./ChatList.state";
import { ChatListData } from "./ChatList.data";

export class ChatListPresenter extends Presenter<IChatListStateObject, ChatListState, ChatListData> {
	public mount(): void {
		this._eventEmitter.subscribe('CALL_ACTION', () => console.log('hello'))
	}
}