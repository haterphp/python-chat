import { ChatSchema } from "@data/chats/schemas/ChatSchema";
import { ComponentState } from "@shared/application/states/ComponentState";

export interface IChatListStateObject {
	chatsList: ChatSchema[]
}

export class ChatListState extends ComponentState<IChatListStateObject> {
	public setChatsList(chats: IChatListStateObject['chatsList']): void {
		this._setStateValue('chatsList', () => chats)
	}
}