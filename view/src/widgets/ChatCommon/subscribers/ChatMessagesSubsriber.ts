import { EventEmitterSubsriber } from "@shared/common/ee/EventEmitterSubsriber";
import { ChatMessageSchema } from "../schemas/ChatMessageSchema";

export class ChatMessagesSubsriber extends EventEmitterSubsriber<ChatMessageSchema[]> {
	public name: string = 'messages';

	private __externalCallback: (value: ChatMessageSchema[]) => void

	constructor (externalCallback: (value: ChatMessageSchema[]) => void) {
		super()
		this.__externalCallback = externalCallback
	}

	protected _actionCallback(payload?: ChatMessageSchema[] | undefined): void {
		if (payload !== undefined) this.__externalCallback(payload)
	}
}