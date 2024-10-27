import { ComponentState } from "@shared/Core/render_core/states/ComponentState";
import { ChatSchema } from "@shared/ChatCommon/schemas/ChatSchema";

export interface IChatWindowState {
	selectedChat: ChatSchema | null
	chats: ChatSchema[]
}

export class ChatWindowState extends ComponentState<IChatWindowState> {

	constructor() {
		super({ selectedChat: null, chats: [] })
	}

	public setChats(chats: ChatSchema[]): void {
		this._setStateValue('chats', () => chats)
	}

	public setSelectedChat(chatId: ChatSchema['id'] | null): void {
		if (chatId === null) {
			this._setStateValue('selectedChat', () => null)
			return
		}

		const findedChat = this.__findChatById(chatId)
		if (findedChat !== null) {
			this._setStateValue('selectedChat', () => findedChat)
		}
	}

	public __findChatById(chatId: ChatSchema['id']): ChatSchema | null {
		for (const chat of this._state.object.chats) {
			if (chatId === chat.id) return chat
		}

		return null
	}

}