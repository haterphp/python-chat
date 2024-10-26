import { ChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state";
import { EventEmitterSubsriber } from "@shared/common/ee/EventEmitterSubsriber";
import { ChatSchema } from "@widgets/ChatCommon/ChatSchema";
import { ChatListSubsribersEnum } from "./ChatListSubsribers.enum";

export class SetCurrentChatSubsriber extends EventEmitterSubsriber<ChatSchema['id']> {
	public name: string = ChatListSubsribersEnum.SET_SELECTED_CHAT;

	private __state: ChatWindowState

	constructor (state: ChatWindowState) {
		super()
		this.__state = state
	}

	protected _actionCallback(payload?: number | undefined): void {
		if (payload === undefined) return
		this.__state.setSelectedChat(payload)
	}
}