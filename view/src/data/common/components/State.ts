import { EventEmitter, ISubsriber } from "../EventEmitter"
import { IClassLifeCycle } from "./Lifecycle"

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

	public setStateValue(key: keyof TState, value: TState[typeof key]) {
		this.__state[key] = value
		this._eventEmmitter.emit(`key_${key.toString()}_updated`, this.__state[key])
	}

	public mount(): void {
		console.log('state: mount')

		const listeners = this._getDataListeners()

		if (listeners !== undefined) {
			for (const [eventName, subscriberCallback] of listeners) {
				this._eventEmmitter.subscribe(eventName, subscriberCallback)
			}
		}
	}

	public unmount(): void {
		console.log('state: unmount')

		const listeners = this._getDataListeners()

		if (listeners !== undefined) {
			for (const [eventName, subscriberCallback] of listeners) {
				this._eventEmmitter.unsubscribe(eventName, subscriberCallback)
			}
		}
	}

	protected _getDataListeners(): [string, ISubsriber<unknown>][] {
		return []
	}
}