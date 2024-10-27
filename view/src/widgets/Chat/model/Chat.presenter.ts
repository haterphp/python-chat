import { Presenter } from "@shared/Core/render_core/Presenter";
import { ChatWindowState, IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state";
import { ChatData } from "./Chat.data";
import { StateKeyChangesSubsriber } from "@shared/Core/common/state/StateKeyChangesSubscriber";
import { ChatSchema } from "@shared/ChatCommon/schemas/ChatSchema";

export class ChatPresenter extends Presenter<IChatWindowState, ChatWindowState, ChatData> {

	public mount(): void {
		this._state.subscribeToStateKeyChanges(new StateKeyChangesSubsriber('selectedChat', this.__loadCurrentChatData.bind(this)))
	}

	private async __loadCurrentChatData(currentChat: ChatSchema| null): Promise<void> {
		if (this._data !== undefined && currentChat !== null) {
			await this._data.loadCurrentChat()
		}
	}
}