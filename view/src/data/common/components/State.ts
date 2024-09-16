import { EventEmitter, ISubsriber } from "../EventEmitter"
import { IClassLifeCycle } from "./Lifecycle"

export const STATE_HAS_CHANGED_EVENT_KEY = 'state_changed'
export const STATE_KEY_HAS_CHANGED_EVENT_KEY = (key: string) => `key_${key}_updated`

export type StateValueFabric<TValue> = (value: TValue) => TValue

export abstract class AbstractComponentState<TState extends object> implements IClassLifeCycle {
	private __state: TState

	protected _eventEmmitter: EventEmitter

	constructor() {
		this.__state = {} as TState
		this._eventEmmitter = new EventEmitter()
	}

	public getState(): TState {
		return this.__state
	}

	public getStateValue(key: keyof TState): unknown {
		return this.__state[key]
	}

	public subscribeToStateChanges(callback: ISubsriber<TState>): void {
		this._eventEmmitter.subscribe(STATE_HAS_CHANGED_EVENT_KEY, callback)
	}

	public subscribeToStateKeyChanges(key: keyof TState, callback: ISubsriber<TState[typeof key]>): void {
		this._eventEmmitter.subscribe(STATE_KEY_HAS_CHANGED_EVENT_KEY(key.toString()), callback)
	}

	public mount(): void {
		this._eventEmmitter.emit(STATE_HAS_CHANGED_EVENT_KEY, this.__state)
	}

	public unmount(): void {
		this._eventEmmitter.unsubscribeAllChilds()
	}

	protected _setStateValue(key: keyof TState, value: StateValueFabric<TState[typeof key]>) {
		this.__state[key] = value(this.__state[key])
		this._eventEmmitter.emit(STATE_KEY_HAS_CHANGED_EVENT_KEY(key.toString()), this.__state[key])
	}
}