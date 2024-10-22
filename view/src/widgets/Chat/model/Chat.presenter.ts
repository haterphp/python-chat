import { Presenter } from "@shared/render_core/Presenter";
import { ChatWindowState, IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state";
import { ChatData } from "./Chat.data";
import { ChatSchema } from "@widgets/ChatCommon/ChatSchema";

export class ChatPresenter extends Presenter<IChatWindowState, ChatWindowState, ChatData> {
	constructor(state: ChatWindowState, data: ChatData) {
		super(state, data)
	}

	public mount(): void {
		this._state.subscribeToStateKeyChanges('selectedChat', this.__loadCurrentChatData.bind(this))
	}

	private async __loadCurrentChatData(currentChat: ChatSchema | null): Promise<void> {
		console.log(currentChat)
		if (this._data !== undefined && currentChat !== null) {
			await this._data.loadCurrentChat()
		}
	}
}