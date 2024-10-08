import { ChatSchema } from "@data/chats/schemas/ChatSchema";
import { ChatWindowState } from "./ChatWindow.state";
import { Presenter } from "@shared/render_core/Presenter";
import { KeyCodes } from "@shared/enums/KeyCodes";

type Actions = 'setCurrentChat'

export class ChatWindowPresenter extends Presenter<{}, ChatWindowState, any, Actions> {

	public mount(): void {
		this._state.subscribeToStateKeyChanges('selectedChat', (chat) => console.log(chat))
		document.addEventListener('keyup', this.__resetCurrentChat.bind(this))
	}

	public unmount(): void {
		document.removeEventListener('keyup', this.__resetCurrentChat.bind(this))
	}

	public setCurrentChat(chat: ChatSchema): void {
		this._state.setSelectedChat(chat)
	}

	private __resetCurrentChat(event: KeyboardEvent): void {
		if (event.key === KeyCodes.ESCAPE) this._state.setSelectedChat(null)
	}

}