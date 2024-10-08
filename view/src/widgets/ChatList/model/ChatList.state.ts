import { ChatSchema } from "@data/chats/schemas/ChatSchema";
import { ComponentState } from "@shared/render_core/states/ComponentState";

export interface IChatListStateObject {
	chatsList: ChatSchema[]
}

export class ChatListState extends ComponentState<IChatListStateObject> {

	constructor() {
		super({ chatsList: [] })
	}

	public setChatsList(chats: ChatSchema[]): void {
		this._setStateValue('chatsList', () => chats)
	}

	public findChatById(chatId: ChatSchema['id']): ChatSchema | null {
		for (const chat of this.getStateValue('chatsList')) {
			if (chat.id === chatId) return chat
		}

		return null
	}

}