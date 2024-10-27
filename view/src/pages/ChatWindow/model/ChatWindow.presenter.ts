import { ChatWindowState, IChatWindowState } from "./ChatWindow.state";
import { Presenter } from "@shared/Core/render_core/Presenter";
import { KeyCodes } from "@shared/Core/enums/KeyCodes";

type Actions = 'setCurrentChat'

export class ChatWindowPresenter extends Presenter<IChatWindowState, ChatWindowState, any, Actions> {

	public mount(): void {
		document.addEventListener('keyup', this.__resetCurrentChat.bind(this))
	}

	public unmount(): void {
		document.removeEventListener('keyup', this.__resetCurrentChat.bind(this))
	}

	private __resetCurrentChat(event: KeyboardEvent): void {
		if (event.key === KeyCodes.ESCAPE) this._state.setSelectedChat(null)
	}

}