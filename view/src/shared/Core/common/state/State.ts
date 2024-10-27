import { EventEmitter } from "../ee/EventEmitter"
import { IClassLifeCycle } from "../Lifecycle"
import { ObjectObserver } from "../ObjectObserver"
import { STATE_HAS_CHANGED_EVENT_KEY, StateChangesSubsriber } from "./StateChangesSubsriber"
import { StateKeyChangesSubsriber } from "./StateKeyChangesSubscriber"


export type StateValueFabric<TValue> = (value: TValue) => TValue | Promise<TValue>

export class State<TState extends object = object> implements IClassLifeCycle {
	protected _state: ObjectObserver<TState>

	public _eventEmmitter: EventEmitter

	constructor(defaultState?: TState) {
		this._eventEmmitter = new EventEmitter()
		this._state = new ObjectObserver(defaultState ?? {} as TState, this._eventEmmitter)
	}

	public getStateObject(): TState {
		return this._state.object
	}

	public subscribeToStateChanges(subscriber: StateChangesSubsriber<TState>): void {
		this._eventEmmitter.subscribe(subscriber)
	}

	public subscribeToStateKeyChanges<TKey extends keyof TState>(subscriber: StateKeyChangesSubsriber<TState, TKey>): void {
		this._state.observeKey(subscriber)
	}

	public unsubscribeFromStateChanges(subscriber: StateChangesSubsriber<TState>): void {
		this._eventEmmitter.unsubscribe(subscriber)
	}

	public unsubscribeFromKeyStateChanges<TKey extends keyof TState>(subscriber: StateKeyChangesSubsriber<TState, TKey>): void {
		this._state.unobserveKey(subscriber)
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