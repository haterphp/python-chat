import { AbstractData } from "@shared/common/Data";
import { sleepResolve } from "@shared/helpers";
import { ChatWindowState, IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state";
import { ChatSchema } from "@widgets/ChatCommon/schemas/ChatSchema";

const STUB_CHATS_LIST = [
	ChatSchema.new({ id: 1, name: 'Test 1' }),
	ChatSchema.new({ id: 2, name: 'Test 2' }),
	ChatSchema.new({ id: 3, name: 'Test 3' }),
	ChatSchema.new({ id: 4, name: 'Test 4' }),
]

export class ChatListData extends AbstractData<ChatWindowState, IChatWindowState> {

	public async beforeMount(): Promise<void> {
		const data = await sleepResolve(1500, Promise.all(STUB_CHATS_LIST))
		this._state.setChats(data)
	}

}