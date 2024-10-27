import { ChatWindowState, IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state";
import { AbstractData } from "@shared/Core/common/Data";
import { GetAllChatMessagesRequest } from "@shared/ChatCommon/requests/GetCurrentChatMessages";


export class ChatData extends AbstractData<ChatWindowState, IChatWindowState> {
	public async loadCurrentChat(): Promise<void> {
		const {selectedChat} = this._state.getStateObject()

		if (selectedChat !== null) {
			const messages = await new GetAllChatMessagesRequest().execute(selectedChat.id)
			selectedChat.update('messages', messages)
		}
	}
}