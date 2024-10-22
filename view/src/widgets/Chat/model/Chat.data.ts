import { ChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state";
import { AbstractData } from "@shared/common/Data";
import { ChatMessageSchema } from "@widgets/ChatCommon/ChatMessageSchema";


const STUB_CHATS_LIST = [
	ChatMessageSchema.new({ id: 1, content: 'Message 1' }),
	ChatMessageSchema.new({ id: 2, content: 'Message 2' }),
]

export class ChatData extends AbstractData<ChatWindowState> {
	public async loadCurrentChat(): Promise<void> {
		const {selectedChat} = this._state.getStateObject()

		console.log(selectedChat)

		if (selectedChat !== null) {
			const messages = await Promise.all(STUB_CHATS_LIST)
			selectedChat.observer.update('messages', messages)
		}
	}
}