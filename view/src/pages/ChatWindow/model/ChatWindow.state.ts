import { ChatSchema } from "@data/chats/schemas/ChatSchema";
import { ComponentState } from "@shared/render_core/states/ComponentState";

export interface IChatWindowState {
	selectedChat: ChatSchema | null
}

export class ChatWindowState extends ComponentState<IChatWindowState> {

	constructor() {
		super({ selectedChat: null })
	}

	public setSelectedChat(selectedChat: ChatSchema | null): void {
		this._setStateValue('selectedChat', () => selectedChat)
	}

}