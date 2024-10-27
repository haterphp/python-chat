import { Presenter } from "../../../shared/Core/render_core/Presenter";

import { ChatListData } from "./ChatList.data";
import { ChatWindowState, IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state";
import { ChatListSubsribersEnum } from "./subsribers/ChatListSubsribers.enum";
import { SetCurrentChatSubsriber } from "./subsribers/SetCurrentChatSubsriber";

export class ChatListPresenter extends Presenter<IChatWindowState, ChatWindowState, ChatListData, ChatListSubsribersEnum> {

	constructor(state: ChatWindowState, data: ChatListData, ) {
		super(state, data)
	}

	public mount(): void {
		this._eventEmitter.subscribe(new SetCurrentChatSubsriber(this._state))
	}
}