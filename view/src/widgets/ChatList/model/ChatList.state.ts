import { ChatSchema } from "@data/chats/schemas/ChatSchema";
import { State } from "@shared/common/State";

export interface IChatListStateObject {
	chatsList: ChatSchema[]
}

export class ChatListState extends State<IChatListStateObject> {
	public setChatsList(chats: IChatListStateObject['chatsList']): void {
		this._setStateValue('chatsList', () => chats)
	}
}