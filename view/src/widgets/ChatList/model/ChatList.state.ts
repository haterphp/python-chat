import { ChatSchema } from "@data/chats/schemas/ChatSchema";
import { AbstractState } from "@data/common/State";

export interface IChatListStateObject {
	chatsList: ChatSchema[]
}

export class ChatListState extends AbstractState<IChatListStateObject> {
	public setChatsList(chats: IChatListStateObject['chatsList']): void {
		this._setStateValue('chatsList', () => chats)
	}
}