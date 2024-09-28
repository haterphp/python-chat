import { State } from "./State";
import { IClassLifeCycle } from "./Lifecycle";
import { AbstractData } from "./Data";
import { EventEmitter, ISubsriber } from "./EventEmitter";
import { ComponentState, ComponentStatesEnum } from "@shared/application/ComponentState";


interface IStateManagementComponentProps<TStateObject extends object = object> {
	getState(): TStateObject

	subscribeToStateChanges(callback: ISubsriber<TStateObject>): void
	subscribeToStateKeyChanges(eventName: keyof TStateObject, callback: ISubsriber<TStateObject[typeof eventName]>): void
}

export type IAbstractComponentProps<TStateObject extends object = object> =
	// IClassLifeCycle
	& IStateManagementComponentProps<TStateObject>

export class Presenter<
	TStateObject extends object = object,
	TState extends State<TStateObject> = State<TStateObject>,
	TData extends AbstractData<TState, TStateObject> | undefined = undefined,
> implements IClassLifeCycle {

	protected _state: TState

	protected _data?: TData

	public eventEmitter: EventEmitter

	constructor (state: TState, data?: TData) {
		this._state = state
		this._data = data

		this.eventEmitter = new EventEmitter()
	}

	// ------------------------------------------
	public mount(componentState: ComponentState): void {
		console.log("DEBUG: [%s] mount", this.constructor.name)

		// Loading data
		if (this._data !== undefined) {
			componentState.setComponentState(ComponentStatesEnum.LOADING)
			this._data.getData(this._state)
				.then(() => {componentState.setComponentState(ComponentStatesEnum.IS_READY_FOR_MOUNT)})
				.catch(() => {componentState.setComponentState(ComponentStatesEnum.DATA_IS_NOT_LOADED)})
		}
		// Loading data

		this._state.mount()
	}

	// ------------------------------------------
	public unmount(): void {
		console.log("DEBUG: [%s] unmount", this.constructor.name)

		this._data?.unmount()
		this._state.unmount()

	}

	// ------------------------------------------
	public getStateManagementProps(): IStateManagementComponentProps<TStateObject> {
		return {
			// Get actual state
			getState: this._state.getState.bind(this._state),

			// Subscribe to state changes
			subscribeToStateChanges: this._state.subscribeToStateChanges.bind(this._state),
			subscribeToStateKeyChanges: this._state.subscribeToStateKeyChanges.bind(this._state),
		}
	}
}