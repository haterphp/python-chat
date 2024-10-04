import { IClassLifeCycle } from "../common/Lifecycle";
import { AbstractData } from "../common/Data";
import { EventEmitter, ISubsriber } from "../common/EventEmitter";
import { COMPONENT_ALREADY_MOUNTED, ComponentRenderState, ComponentRenderStatesEnum } from "@shared/application/states/RenderComponentState";
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

	private __componentRenderState: ComponentRenderState | null

	constructor (state: TState, data?: TData) {
		this._state = state
		this._data = data

		this._eventEmitter = new EventEmitter()

		this.__componentRenderState = null
	}

	// ------------------------------------------
	public mount(componentRenderState: ComponentRenderState): void {
		this.__componentRenderState = componentRenderState

		// Loading data
		if (this._data !== undefined) {
			componentRenderState.setComponentState(ComponentRenderStatesEnum.LOADING)
			this._data.getData(this._state)
				.then(() => {componentRenderState.setComponentState(ComponentRenderStatesEnum.IS_MOUNTING)})
				.catch(() => {componentRenderState.setComponentState(ComponentRenderStatesEnum.DATA_IS_NOT_LOADED)})
		}
		// Loading data

		console.log('mount %s', this.constructor.name)

		this._eventEmitter.subscribe(COMPONENT_ALREADY_MOUNTED, this.__componentIsAlreadyMounted.bind(this))
		this._state.mount()
	}

	// ------------------------------------------
	public unmount(): void {
		this._data?.unmount()
		this._state.unmount()
		this.__componentRenderState?.unmount()

		this._eventEmitter.unsubscribeAllChilds()
	}

	// ------------------------------------------
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

	private __componentIsAlreadyMounted () {
		this._state.afterMount()
		this.__componentRenderState?.setComponentState(ComponentRenderStatesEnum.IDLE)

	}
}