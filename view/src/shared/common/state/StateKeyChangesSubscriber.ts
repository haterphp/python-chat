import { EventEmitterSubsriber } from "../ee/EventEmitterSubsriber";


export class StateKeyChangesSubsriber<TStateObject extends object, TKey extends keyof TStateObject = keyof TStateObject> extends EventEmitterSubsriber<TStateObject[TKey]> {
	public name: string;

	private __externalCallback: (state: TStateObject[TKey]) => void

	constructor (
		name: TKey,
		externalCallback: (state: TStateObject[TKey]) => void,
		includedValues: Array<TStateObject[TKey]> = []
	) {
		super(includedValues)
		this.name = name as string
		this.__externalCallback = externalCallback
	}

	protected _actionCallback(payload?: TStateObject[TKey]): void {
		if (payload !== undefined) this.__externalCallback(payload)
	}
}