import { EventEmitter, ISubsriber } from "./EventEmitter"
import { IClassLifeCycle } from "../common/Lifecycle"
import { ObjectObserver } from "./ObjectObserver"

export const STATE_HAS_CHANGED_EVENT_KEY = 'state_changed'

export type StateValueFabric<TValue> = (value: TValue) => TValue | Promise<TValue>

export class State<TState extends object = object> implements IClassLifeCycle {
	protected _state: ObjectObserver<TState>

	protected _eventEmmitter: EventEmitter

	constructor(defaultState?: TState) {
		this._eventEmmitter = new EventEmitter()
		this._state = new ObjectObserver(defaultState ?? {} as TState, this._eventEmmitter)
	}

	public getStateObject(): TState {
		return this._state.object
	}

	public subscribeToStateChanges(callback: ISubsriber<TState>): void {
		this._eventEmmitter.subscribe(STATE_HAS_CHANGED_EVENT_KEY, callback)
	}

	public subscribeToStateKeyChanges<TKey extends keyof TState>(key: TKey, callback: ISubsriber<TState[TKey]>, includesValue: Array<TState[TKey]> = []): void {
		this._state.observeKey(key, callback, includesValue)
	}

	public unsubscribeFromStateChanges(callback: ISubsriber<TState>): void {
		this._eventEmmitter.unsubscribe(STATE_HAS_CHANGED_EVENT_KEY, callback)
	}

	public unsubscribeFromKeyStateChanges<TKey extends keyof TState>(key: TKey, callback: ISubsriber<TState[TKey]>): void {
		this._state.unobserveKey(key, callback)
	}

	public mount(): void {
		this._eventEmmitter.emit(STATE_HAS_CHANGED_EVENT_KEY, this._state)
	}

	public unmount(): void {
		this._eventEmmitter.unsubscribeAllChilds()
	}

	protected _setStateValue<TKey extends keyof TState>(key: TKey, value: StateValueFabric<TState[TKey]>) {
		Promise.resolve(value(this._state.object[key])).then((value) => {
			this._state.update(key, value)
		})
	}
}