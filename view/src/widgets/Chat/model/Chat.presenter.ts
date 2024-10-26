import { Presenter } from "@shared/render_core/Presenter";
import { ChatWindowState, IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state";
import { ChatData } from "./Chat.data";
import { StateKeyChangesSubsriber } from "@shared/common/state/StateKeyChangesSubscriber";
import { ChatSchema } from "@widgets/ChatCommon/schemas/ChatSchema";

export class ChatPresenter extends Presenter<IChatWindowState, ChatWindowState, ChatData> {
	private __selectedChatSubsriber: StateKeyChangesSubsriber<IChatWindowState, 'selectedChat'>

	constructor(state: ChatWindowState, data: ChatData) {
		super(state, data)

		this.__selectedChatSubsriber = new StateKeyChangesSubsriber('selectedChat', this.__loadCurrentChatData.bind(this))
	}

	public mount(): void {
		this._state.subscribeToStateKeyChanges(this.__selectedChatSubsriber)
	}

	private async __loadCurrentChatData(currentChat: ChatSchema| null): Promise<void> {
		if (this._data !== undefined && currentChat !== null) {
			await this._data.loadCurrentChat()
		}
	}
}