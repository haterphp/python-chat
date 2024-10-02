import { IClassLifeCycle } from "@shared/common/Lifecycle";
import { IPresenterProps, Presenter } from "@shared/application/Presenter";
import { FC } from "react";
import { ComponentRenderState, ComponentRenderStatesEnum } from "./states/RenderComponentState";
import { State } from "@shared/common/State";
import { AbstractData } from "@shared/common/Data";
import { ComponentState } from "./states/ComponentState";

type IComponentProps = Record<string, string | boolean | number | Function>

export type IAbstractComponentProps<TStateObject extends object> = IComponentProps & IPresenterProps<TStateObject>

export abstract class AbstractComponentProvider<
	TPresenter extends Presenter<TStateObject, TState, TData>,
	TStateObject extends object = object,
	TState extends ComponentState<TStateObject> = ComponentState<TStateObject>,
	TData extends AbstractData<TState, TStateObject> = AbstractData<TState, TStateObject>,
> implements IClassLifeCycle {

	protected _presenter: TPresenter

	private __componentRenderState: ComponentRenderState | null

	constructor (presenter: TPresenter) {
		this._presenter = presenter
		this.__componentRenderState = null
	}

	public setComponentRenderState(renderState: ComponentRenderState): void {
		this.__componentRenderState = renderState
	}

	public mount(): void {
		this.__componentRenderState?.mount()
		this._presenter.mount(this.__componentRenderState!)
	}

	public unmount(): void {
		this.__componentRenderState?.unmount()
		this._presenter.unmount()
	}

	public render(): FC {
		const state = this.__componentRenderState?.getStateValue('state')

		switch (state) {
			case ComponentRenderStatesEnum.LOADING: return this._getLoadingRenderComponent()
			case ComponentRenderStatesEnum.DATA_IS_NOT_LOADED: return this._getErrorRenderComponent()

			default: return this._getRenderComponent(this._getRenderComponentsProps())
		}
	}

	// Hook for setting other props for component
	protected _getRenderComponentsProps(): IAbstractComponentProps<TStateObject> {
		return Object.assign({} as IComponentProps, this._presenter.getPresenterProps())
	}

	// Component render component if data has received
	protected abstract _getRenderComponent(props: IAbstractComponentProps<TStateObject>): FC

	// Error fallback
	protected _getErrorRenderComponent(): FC {
		return () => 'Error'
	}

	// Error fallback
	protected _getLoadingRenderComponent(): FC {
		return () => 'Loading...'
	}
}