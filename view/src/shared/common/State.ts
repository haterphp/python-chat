import { EventEmitter, ISubsriber } from "./EventEmitter"
import { IClassLifeCycle } from "../common/Lifecycle"

export const STATE_HAS_CHANGED_EVENT_KEY = 'state_changed'
export const STATE_KEY_HAS_CHANGED_EVENT_KEY = (key: string) => `key_${key}_updated`

export type StateValueFabric<TValue> = (value: TValue) => TValue | Promise<TValue>

export class State<TState extends object = object> implements IClassLifeCycle {
	private __state: TState

	protected _eventEmmitter: EventEmitter

	constructor(defaultState?: TState) {
		this.__state = (defaultState ?? {}) as TState
		this._eventEmmitter = new EventEmitter()
	}

	public getState(): TState {
		return this.__state
	}

	public getStateValue<TKey extends keyof TState>(key: TKey): TState[TKey] {
		return this.__state[key]
	}

	public subscribeToStateChanges(callback: ISubsriber<TState>): void {
		this._eventEmmitter.subscribe(STATE_HAS_CHANGED_EVENT_KEY, callback)
	}

	public subscribeToStateKeyChanges<TKey extends keyof TState>(key: TKey, callback: ISubsriber<TState[TKey]>): void {
		this._eventEmmitter.subscribe(STATE_KEY_HAS_CHANGED_EVENT_KEY(key.toString()), callback)
	}

	public subscribeToCurrentValueStateKeyChanges<TKey extends keyof TState>(
		key: TKey,
		findedValue: TState[TKey] | TState[TKey][],
		callback: ISubsriber<TState[TKey]>
	): void {
		this._eventEmmitter.subscribe(STATE_KEY_HAS_CHANGED_EVENT_KEY(key.toString()), (value: TState[TKey]) => {
			if (Array.isArray(findedValue) && findedValue.includes(value)) return callback(value)
			else if (findedValue === value) return callback(value)
		})
	}

	public unsubscribeFromStateChanges(callback: ISubsriber<TState>): void {
		this._eventEmmitter.unsubscribe(STATE_HAS_CHANGED_EVENT_KEY, callback)
	}

	public unsubscribeFromKeyStateChanges<TKey extends keyof TState>(key: TKey, callback: ISubsriber<TState[TKey]>): void {
		this._eventEmmitter.unsubscribe(STATE_KEY_HAS_CHANGED_EVENT_KEY(key.toString()), callback)
	}

	public mount(): void {
		this._eventEmmitter.emit(STATE_HAS_CHANGED_EVENT_KEY, this.__state)
	}

	public unmount(): void {
		this._eventEmmitter.unsubscribeAllChilds()
	}

	protected _setStateValue<TKey extends keyof TState>(key: TKey, value: StateValueFabric<TState[TKey]>) {
		Promise.resolve(value(this.__state[key])).then((value) => {
			this.__state[key] = value
			this._eventEmmitter.emit(STATE_KEY_HAS_CHANGED_EVENT_KEY(key.toString()), this.__state[key])
		})
	}
}