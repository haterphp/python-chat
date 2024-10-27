import { ChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state";
import { EventEmitterSubsriber } from "@shared/Core/common/ee/EventEmitterSubsriber";
import { ChatListSubsribersEnum } from "./ChatListSubsribers.enum";
import { ChatSchema } from "@shared/ChatCommon/schemas/ChatSchema";

export class SetCurrentChatSubsriber extends EventEmitterSubsriber<ChatSchema['id']> {
	public name: string = ChatListSubsribersEnum.SET_SELECTED_CHAT;

	private __state: ChatWindowState

	constructor (state: ChatWindowState) {
		super()
		this.__state = state
	}

	protected _actionCallback(payload?: number | undefined): void {
		if (payload === undefined) return

		const {selectedChat} = this.__state.getStateObject()
		if (selectedChat?.id === payload) return

		this.__state.setSelectedChat(payload)
	}
}