import { Presenter } from "../../../shared/render_core/Presenter";

import { ChatListState, IChatListStateObject } from "./ChatList.state";
import { ChatListData } from "./ChatList.data";
import { ChatSchema } from "@data/chats/schemas/ChatSchema";

interface IChatListPresenterPayload {
	setCurrentChat: (chat: ChatSchema) => void
}

export type ChatListEventEmitterKeys = 'setCurrentChat'

export class ChatListPresenter extends Presenter<IChatListStateObject, ChatListState, ChatListData, ChatListEventEmitterKeys> {

	private __setCurrentChatCallback: IChatListPresenterPayload['setCurrentChat']

	constructor(state: ChatListState, data: ChatListData, payload: IChatListPresenterPayload) {
		super(state, data)

		this.__setCurrentChatCallback = payload.setCurrentChat
	}

	public mount(): void {
		this._eventEmitter.subscribe('setCurrentChat', this.__setCurrentChat.bind(this))
	}

	private __setCurrentChat(chatId: ChatSchema['id']): void {
		const chat = this._state.findChatById(chatId)
		if (chat !== null) this.__setCurrentChatCallback(chat)
	}
}