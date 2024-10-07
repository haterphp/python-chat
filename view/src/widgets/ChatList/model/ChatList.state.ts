import { ChatSchema } from "@data/chats/schemas/ChatSchema";
import { ComponentState } from "@shared/render_core/states/ComponentState";

export interface IChatListStateObject {
	chatsList: ChatSchema[]
}

export class ChatListState extends ComponentState<IChatListStateObject> {
	constructor() {
		super({ chatsList: [] })
	}

	public setChatsList(chats: IChatListStateObject['chatsList']): void {
		this._setStateValue('chatsList', () => chats)
	}

	public printChatListId(chatId: ChatSchema['id']): void {
		const selectedChat = this.getStateValue('chatsList').find(item => item.id === chatId)

		if (selectedChat !== undefined) {
			this._setStateValue('chatsList', async (prevChats) => {
				const newChat = await ChatSchema.new({ id: selectedChat.id, name: selectedChat.name })
				return [...prevChats, newChat]
			})
		}
	}
}