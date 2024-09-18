import { EventEmitter, ISubsriber } from "./EventEmitter"
import { IClassLifeCycle } from "./components/Lifecycle"

export const STATE_HAS_CHANGED_EVENT_KEY = 'state_changed'
export const STATE_KEY_HAS_CHANGED_EVENT_KEY = (key: string) => `key_${key}_updated`

export type StateValueFabric<TValue> = (value: TValue) => TValue

export abstract class AbstractState<TState extends object = object> implements IClassLifeCycle {
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

	public mount(): void {
		this._eventEmmitter.emit(STATE_HAS_CHANGED_EVENT_KEY, this.__state)
	}

	public unmount(): void {
		this._eventEmmitter.unsubscribeAllChilds()
	}

	protected _setStateValue<TKey extends keyof TState>(key: TKey, value: StateValueFabric<TState[TKey]>) {
		this.__state[key] = value(this.__state[key])
		this._eventEmmitter.emit(STATE_KEY_HAS_CHANGED_EVENT_KEY(key.toString()), this.__state[key])
	}
}