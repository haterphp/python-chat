import { Presenter } from "../../../shared/render_core/Presenter";

import { ChatListData } from "./ChatList.data";
import { ChatSchema } from "@widgets/ChatCommon/ChatSchema";
import { ChatWindowState, IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state";

export type ChatListEventEmitterKeys = 'setCurrentChat'

export class ChatListPresenter extends Presenter<IChatWindowState, ChatWindowState, ChatListData, ChatListEventEmitterKeys> {
	constructor(state: ChatWindowState, data: ChatListData, ) {
		super(state, data)
	}

	public mount(): void {
		this._eventEmitter.subscribe('setCurrentChat', this.__setCurrentChat.bind(this))
	}

	private __setCurrentChat(chatId: ChatSchema['id']): void {
		this._state.setSelectedChat(chatId)
	}
}