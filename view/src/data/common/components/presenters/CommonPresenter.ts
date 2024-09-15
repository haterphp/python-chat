import { FC } from "react";
import { AbstractComponentState } from "../State";
import { IClassLifeCycle } from "../Lifecycle";
import { AbstractComponentData } from "../Data";

type IComponentProps = Record<string, string | boolean | number | Function>

export interface IAbstractComponentProps extends IClassLifeCycle {}

export abstract class AbstractPresenter<
	TState extends AbstractComponentState<TStateObject>,
	TData extends AbstractComponentData<TState, TStateObject>,
	TStateObject extends object = object,
> {

	protected _state: TState

	protected _data: TData

	constructor (state: TState, data: TData) {
		this._state = state
		this._data = data
	}

	public async render(): Promise<{ default: FC }> {
		try {
			console.log('render')
			// Load component data
			await this._data.getData(this._state)

			// Make component props
			const props = Object.assign({}, this.__getLifeCycleProps())

			return { default: this._getRenderComponent(props) }
		} catch {
			return { default: this._getErrorRenderComponent() }
		}
	}

	// Component render component if data has received
	protected abstract _getRenderComponent(props: IAbstractComponentProps): FC

	// Error fallback
	protected _getErrorRenderComponent(): FC {
		return () => null
	}

	// Hook for setting other props for component
	protected _getRenderComponentsProps(): IComponentProps {
		return {}
	}

	private _mount(): void {
		this._data.mount(this._state)
		this._state.mount()
	}

	private _unmount(): void {
		this._data.unmount()
		this._state.unmount()
	}

	private __getLifeCycleProps(): IAbstractComponentProps {
		return {
			mount: this._mount.bind(this),
			unmount: this._unmount.bind(this),
		}
	}
}