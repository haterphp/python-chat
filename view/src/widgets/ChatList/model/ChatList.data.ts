import { AbstractData } from "@shared/Core/common/Data";
import { ChatWindowState, IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state";
import { GetAllChatsRequest } from "@shared/ChatCommon/requests/GetAllChatsRequest";

export class ChatListData extends AbstractData<ChatWindowState, IChatWindowState> {

	public async beforeMount(): Promise<void> {
		const chats = await new GetAllChatsRequest().execute()
		this._state.setChats(chats)
	}

}