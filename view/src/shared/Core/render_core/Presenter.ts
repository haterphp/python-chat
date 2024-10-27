import { IClassLifeCycle } from "../common/Lifecycle";
import { AbstractData } from "../common/Data";
import { EventEmitter } from "../common/ee/EventEmitter";
import { ComponentRenderStatesEnum } from "@shared/Core/render_core/states/RenderComponentState";
import { ComponentState } from "./states/ComponentState";
import { STATE_HAS_CHANGED_EVENT_KEY, StateChangesSubsriber } from "@shared/Core/common/state/StateChangesSubsriber";
import { StateKeyChangesSubsriber } from "@shared/Core/common/state/StateKeyChangesSubscriber";
import { EventEmitterSubsriber } from "@shared/Core/common/ee/EventEmitterSubsriber";

export interface IPresenterProps<
	TStateObject extends object = object,
	TEventEmitterSubscriberNames extends string = string
> {
	emitAction(name: TEventEmitterSubscriberNames, payload?: any): void

	subscribeToStateChanges(subscriber: StateChangesSubsriber<TStateObject>): void
	subscribeToStateKeyChanges<TKey extends keyof TStateObject>(subscriber: StateKeyChangesSubsriber<TStateObject, TKey>): void
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

	private __childComponentSubscribers: Array<EventEmitterSubsriber>

	constructor (state: TState, data?: TData) {
		this._state = state
		this._data = data

		this._eventEmitter = new EventEmitter()

		this.__childComponentSubscribers = []
	}

	public __beforeMount(setComponentState: (state: ComponentRenderStatesEnum) => void): void {
		if (this._data !== undefined) {
			this._data?.beforeMount()
				.then(() => {
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
		for (const s of this.__childComponentSubscribers) {
			if (s.name === STATE_HAS_CHANGED_EVENT_KEY) this._state.unsubscribeFromStateChanges(s as StateChangesSubsriber<TStateObject>)
			else this._state.unsubscribeFromKeyStateChanges(s as StateKeyChangesSubsriber<TStateObject>)
		}
	}

	public getPresenterProps(): IPresenterProps<TStateObject, TEventEmitterSubscriberNames> {
		return {
			emitAction: this._eventEmitter.emit.bind(this._eventEmitter),

			// Subscribe to state changes
			subscribeToStateChanges: this.__subscribeToStateChanges.bind(this),
			subscribeToStateKeyChanges: this.__subscribeToStateKeyChanges.bind(this),
		}
	}

	private __subscribeToStateChanges(subscriber: StateChangesSubsriber<TStateObject>): void {
		this.__childComponentSubscribers.push(subscriber)
		this._state.subscribeToStateChanges(subscriber)
	}

	private __subscribeToStateKeyChanges<TKey extends keyof TStateObject>(subscriber: StateKeyChangesSubsriber<TStateObject, TKey>): void {
		this.__childComponentSubscribers.push(subscriber)
		this._state.subscribeToStateKeyChanges<TKey>(subscriber)
	}
}