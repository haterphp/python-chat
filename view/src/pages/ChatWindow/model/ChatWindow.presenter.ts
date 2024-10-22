import { ChatSchema } from "@widgets/ChatCommon/ChatSchema";
import { ChatWindowState } from "./ChatWindow.state";
import { Presenter } from "@shared/render_core/Presenter";
import { KeyCodes } from "@shared/enums/KeyCodes";
import { ComponentRenderStatesEnum } from "@shared/render_core/states/RenderComponentState";

type Actions = 'setCurrentChat'

export class ChatWindowPresenter extends Presenter<{}, ChatWindowState, any, Actions> {

	public mount(): void {
		document.addEventListener('keyup', this.__resetCurrentChat.bind(this))
		this._state.subscribeToStateKeyChanges('selectedChat', (chat) => console.log(chat))
	}

	public unmount(): void {
		document.removeEventListener('keyup', this.__resetCurrentChat.bind(this))
	}

	private __resetCurrentChat(event: KeyboardEvent): void {
		if (event.key === KeyCodes.ESCAPE) this._state.setSelectedChat(null)
	}

}