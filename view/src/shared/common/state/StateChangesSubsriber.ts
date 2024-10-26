import { EventEmitterSubsriber } from "../ee/EventEmitterSubsriber";

export const STATE_HAS_CHANGED_EVENT_KEY = 'state_changed'

export class StateChangesSubsriber<TStateObject extends object> extends EventEmitterSubsriber<TStateObject> {
	public name: string = STATE_HAS_CHANGED_EVENT_KEY;

	private __externalCallback: (state: TStateObject) => void

	constructor (externalCallback: (state: TStateObject) => void) {
		super()
		this.__externalCallback = externalCallback
	}

	protected _actionCallback(payload?: TStateObject): void {
		if (payload !== undefined) this.__externalCallback(payload)
	}
}