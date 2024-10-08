import { IClassLifeCycle } from "../common/Lifecycle";
import { AbstractData } from "../common/Data";
import { EventEmitter, ISubsriber } from "../common/EventEmitter";
import { ComponentRenderStatesEnum } from "@shared/render_core/states/RenderComponentState";
import { ComponentState } from "./states/ComponentState";
import { STATE_HAS_CHANGED_EVENT_KEY } from "@shared/common/State";


export interface IPresenterProps<
	TStateObject extends object = object,
	TEventEmitterSubscriberNames extends string = string
> {
	getState(): TStateObject

	emitAction(name: TEventEmitterSubscriberNames, payload?: any): void

	subscribeToStateChanges(callback: ISubsriber<TStateObject>): void
	subscribeToStateKeyChanges(eventName: keyof TStateObject, callback: ISubsriber<TStateObject[typeof eventName]>): void
}

export class Presenter<
	TStateObject extends object = object,
	TState extends ComponentState<TStateObject> = ComponentState<TStateObject>,
	TData extends AbstractData<TState, TStateObject> = AbstractData<TState, TStateObject>,
	TEventEmitterSubscriberNames extends string = string
> implements IClassLifeCycle {

	protected _eventEmitter: EventEmitter<TEventEmitterSubscriberNames>

	protected _state: TState

	protected _data?: TData

	private __childComponentSubscribers: Array<[string, ISubsriber<any>]>

	constructor (state: TState, data?: TData) {
		this._state = state
		this._data = data

		this._eventEmitter = new EventEmitter()

		this.__childComponentSubscribers = []
	}

	public beforeMount(setComponentState: (state: ComponentRenderStatesEnum) => void): void {
		if (this._data !== undefined) {
			this._data?.getData(this._state)
				.then(() => {
					this._data?.beforeMount(this._state)
					setComponentState(ComponentRenderStatesEnum.READY_FOR_MOUNTING)
				})
				.catch(() => {
					setComponentState(ComponentRenderStatesEnum.DATA_IS_NOT_LOADED)
				})
		} else {
			setComponentState(ComponentRenderStatesEnum.READY_FOR_MOUNTING)
		}
	}

	public mount(): void {
		this._data?.mount()
		this._state.mount()
	}

	public afterMount(): void {
		this._state.afterMount()
	}

	public unmount(): void {
		this._data?.unmount()
		this._state.unmount()

		this._eventEmitter.unsubscribeAllChilds()
	}

	public unmountChildComponent(): void {
		for (const [key, callback] of this.__childComponentSubscribers) {
			if (key === STATE_HAS_CHANGED_EVENT_KEY) this._state.unsubscribeFromStateChanges(callback)
			else this._state.unsubscribeFromKeyStateChanges(key as keyof TStateObject, callback)
		}
	}

	public getPresenterProps(): IPresenterProps<TStateObject, TEventEmitterSubscriberNames> {
		return {
			emitAction: this._eventEmitter.emit.bind(this._eventEmitter),

			// Get actual state
			getState: this._state.getState.bind(this._state),

			// Subscribe to state changes
			subscribeToStateChanges: this.__subscribeToStateChanges.bind(this),
			subscribeToStateKeyChanges: this.__subscribeToStateKeyChanges.bind(this),
		}
	}

	private __subscribeToStateChanges(callback: ISubsriber<TStateObject>): void {
		this.__childComponentSubscribers.push([STATE_HAS_CHANGED_EVENT_KEY, callback])
		this._state.subscribeToStateChanges(callback)
	}

	private __subscribeToStateKeyChanges<TKey extends keyof TStateObject>(key: TKey, callback: ISubsriber<TStateObject[TKey]>): void {
		this.__childComponentSubscribers.push([key as string, callback])
		this._state.subscribeToStateKeyChanges(key, callback)
	}
}