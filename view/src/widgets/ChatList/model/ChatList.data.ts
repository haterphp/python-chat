import { AbstractData } from "@data/common/Data";
import { ChatListState, IChatListStateObject } from "./ChatList.state";
import { ChatSchema } from "@data/chats/schemas/ChatSchema";
import { sleepResolve } from "@data/common/helpers";

const STUB_CHATS_LIST = [
	ChatSchema.new({ id: 1, name: 'Test 1' }),
	ChatSchema.new({ id: 2, name: 'Test 2' }),
	ChatSchema.new({ id: 3, name: 'Test 3' }),
	ChatSchema.new({ id: 4, name: 'Test 4' }),
]

export class ChatListData extends AbstractData<ChatListState, IChatListStateObject> {
	public async getData(state: ChatListState): Promise<void> {
		const data = await sleepResolve(1500, Promise.all(STUB_CHATS_LIST))
		state.setChatsList(data)
	}
}