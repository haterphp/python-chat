export abstract class EventEmitterSubsriber<TPayload = unknown> {
	public abstract name: string

	protected _includedValues: TPayload[]

	constructor(includedValues: TPayload[] = []) {
		this._includedValues = includedValues
	}

	public action(payload?: TPayload): void {
		if (this._includedValues.length > 0 && payload !== undefined) {
			if (this._includedValues.includes(payload)) this._actionCallback(payload)
			return
		}
		this._actionCallback(payload)
	}

	protected abstract _actionCallback(payload?: TPayload): void
}