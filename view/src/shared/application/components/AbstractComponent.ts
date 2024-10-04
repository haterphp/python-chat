import { IClassLifeCycle } from "@shared/common/Lifecycle";
import { IPresenterProps, Presenter } from "@shared/application/Presenter";
import { ComponentRenderState, ComponentRenderStatesEnum } from "../states/RenderComponentState";
import { AbstractData } from "@shared/common/Data";
import { ComponentState } from "../states/ComponentState";

type IComponentProps = Record<string, string | boolean | number | Function>

export type IAbstractComponentProps<TStateObject extends object> = IComponentProps & IPresenterProps<TStateObject>

export abstract class AbstractComponent<
	TPresenter extends Presenter<TStateObject, TState, TData>,
	TRenderComponent,
	TStateObject extends object,
	TState extends ComponentState<TStateObject>,
	TData extends AbstractData<TState, TStateObject>,
> implements IClassLifeCycle {

	protected _presenter: TPresenter

	private __componentRenderState: ComponentRenderState | null

	constructor (presenter: TPresenter) {
		this._presenter = presenter
		this.__componentRenderState = null
	}

	public setComponentRenderState(renderstate: ComponentRenderState) {
		this.__componentRenderState = renderstate
	}

	public mount(): void {
		console.log("DEBUG: [%s] mount", this.constructor.name)

		this.__componentRenderState?.mount()
		this._presenter.mount(this.__componentRenderState!)
	}

	public unmount(): void {
		console.log("DEBUG: [%s] unmount", this.constructor.name)

		this.__componentRenderState?.unmount()
		this._presenter.unmount()
	}

	public getRenderComponentByState(state: ComponentRenderStatesEnum): TRenderComponent {
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
	protected abstract _getRenderComponent(props: IAbstractComponentProps<TStateObject>): TRenderComponent

	// Error fallback
	protected abstract _getErrorRenderComponent(): TRenderComponent

	// Error fallback
	protected abstract _getLoadingRenderComponent(): TRenderComponent
}