import { IClassLifeCycle } from "../common/Lifecycle";
import { AbstractData } from "../common/Data";
import { EventEmitter, ISubsriber } from "../common/EventEmitter";
import { ComponentRenderState, ComponentRenderStatesEnum } from "@shared/render_core/states/RenderComponentState";
import { ComponentState } from "./states/ComponentState";

export interface IPresenterProps<TStateObject extends object = object> {
	getState(): TStateObject

	emitAction(name: string, payload?: any): void

	subscribeToStateChanges(callback: ISubsriber<TStateObject>): void
	subscribeToStateKeyChanges(eventName: keyof TStateObject, callback: ISubsriber<TStateObject[typeof eventName]>): void
}

export class Presenter<
	TStateObject extends object = object,
	TState extends ComponentState<TStateObject> = ComponentState<TStateObject>,
	TData extends AbstractData<TState, TStateObject> = AbstractData<TState, TStateObject>,
> implements IClassLifeCycle {

	protected _eventEmitter: EventEmitter

	protected _state: TState

	protected _data?: TData

	constructor (state: TState, data?: TData) {
		this._state = state
		this._data = data

		this._eventEmitter = new EventEmitter()

	}

	public beforeMount(setComponentState: (state: ComponentRenderStatesEnum) => void): void {
		if (this._data !== undefined) {

			setComponentState(ComponentRenderStatesEnum.LOADING)

			this._data?.getData(this._state)
				.then(() => {
					this._data?.beforeMount(this._state)
					setComponentState(ComponentRenderStatesEnum.IS_READY_FOR_MOUNTING)
				})
				.catch(() => {
					setComponentState(ComponentRenderStatesEnum.DATA_IS_NOT_LOADED)
				})
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

	public getPresenterProps(): IPresenterProps<TStateObject> {
		return {
			emitAction: this._eventEmitter.emit.bind(this._eventEmitter),

			// Get actual state
			getState: this._state.getState.bind(this._state),

			// Subscribe to state changes
			subscribeToStateChanges: this._state.subscribeToStateChanges.bind(this._state),
			subscribeToStateKeyChanges: this._state.subscribeToStateKeyChanges.bind(this._state),
		}
	}
}