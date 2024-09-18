import { FC } from "react";
import { AbstractState } from "../State";
import { IClassLifeCycle } from "./Lifecycle";
import { AbstractData } from "../Data";
import { EventEmitter, ISubsriber } from "../EventEmitter";

export type IComponentProps = Record<string, string | boolean | number | Function>

interface IStateManagementComponentProps<TStateObject extends object = object> {
	getState(): TStateObject

	callAction(eventName: string, payload?: any): void

	subscribeToStateChanges(callback: ISubsriber<TStateObject>): void
	subscribeToStateKeyChanges(eventName: keyof TStateObject, callback: ISubsriber<TStateObject[typeof eventName]>): void
}

export type IAbstractComponentProps<TStateObject extends object = object> =
	IClassLifeCycle
	& IStateManagementComponentProps<TStateObject>
	& IComponentProps

export abstract class AbstractPresenter<
	TState extends AbstractState<TStateObject>,
	TData extends AbstractData<TState, TStateObject> | undefined = undefined,
	TStateObject extends object = object,
> {

	protected _state: TState

	protected _data?: TData

	protected _eventEmitter: EventEmitter

	constructor (state: TState, data?: TData) {
		this._state = state
		this._data = data

		this._eventEmitter = new EventEmitter()
	}

	public async render(): Promise<{ default: FC }> {
		try {
			// Load component data
			if (this._data !== undefined) await this._data.getData(this._state)

			// Make component props
			const props: IAbstractComponentProps<TStateObject> = Object.assign(
				this._getRenderComponentsProps(),
				this.__getLifeCycleProps(),
				this.__getStateManagementProps()
			)

			return { default: this._getRenderComponent(props) }
		} catch {
			return { default: this._getErrorRenderComponent() }
		}
	}

	// Component render component if data has received
	protected abstract _getRenderComponent(props: IAbstractComponentProps<TStateObject>): FC

	// Error fallback
	protected _getErrorRenderComponent(): FC {
		return () => null
	}

	// Hook for setting other props for component
	protected _getRenderComponentsProps(): IComponentProps {
		return {}
	}

	// Life cycle hooks for presenter
	protected _mount(): void {}
	protected _unmount(): void {}
	// Life cycle hooks for presenter

	// Life cycle hooks for render component
	private __componentMount(): void {
		console.log("DEBUG: [%s] mount", this.constructor.name)

		this._data?.mount(this._state)
		this._state.mount()

		this._mount()
	}

	private __componentUnmount(): void {
		console.log("DEBUG: [%s] unmount", this.constructor.name)

		this._data?.unmount()
		this._state.unmount()

		this._unmount()
	}
	// Life cycle hooks for render component

	private __getStateManagementProps(): IStateManagementComponentProps<TStateObject> {
		return {
			// Get actual state
			getState: this._state.getState.bind(this._state),

			// Emit actions from component
			callAction: this._eventEmitter.emit.bind(this._eventEmitter),

			// Subscribe to state changes
			subscribeToStateChanges: this._state.subscribeToStateChanges.bind(this._state),
			subscribeToStateKeyChanges: this._state.subscribeToStateKeyChanges.bind(this._state),
		}
	}

	private __getLifeCycleProps(): IClassLifeCycle {
		return {
			mount: this.__componentMount.bind(this),
			unmount: this.__componentUnmount.bind(this),
		}
	}
}