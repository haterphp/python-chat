import { IClassLifeCycle } from "@shared/common/Lifecycle";
import { IPresenterProps, Presenter } from "@shared/render_core/Presenter";
import { ComponentRenderState, ComponentRenderStatesEnum } from "../states/RenderComponentState";
import { AbstractData } from "@shared/common/Data";
import { ComponentState } from "../states/ComponentState";

type IComponentProps = Record<string, string | boolean | number | Function>

interface IRenderComponentProps {
	componentMountedCallback(): void
	componentUnMountedCallback(): void
}

export type IAbstractComponentProps<TStateObject extends object> = IComponentProps & IPresenterProps<TStateObject> & IRenderComponentProps

export abstract class AbstractComponent<
	TRenderComponent,
	TPresenter extends Presenter<TStateObject, TState, TData>,
	TStateObject extends object,
	TState extends ComponentState<TStateObject>,
	TData extends AbstractData<TState, TStateObject>,
	TComponentProps extends IComponentProps = IComponentProps
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

	public beforeMount(): void {
		if (this.__componentRenderState === null)
			throw new Error(`CompnentRenderState is not found in ${this.constructor.name}`)

		console.log("DEBUG: [%s] beforeMount", this.constructor.name)

		this._presenter.beforeMount(this.__componentRenderState.setComponentState.bind(this.__componentRenderState))
	}

	public mount(): void {
		console.log("DEBUG: [%s] mount", this.constructor.name)
		this._presenter.mount()
	}

	public unmount(): void {
		console.log("DEBUG: [%s] unmount", this.constructor.name)
		this._presenter.unmount()
	}

	public afterMount(): void {
		console.log("DEBUG: [%s] afterMount", this.constructor.name)
		this._presenter.afterMount()
	}

	public getRenderComponentByState(state: ComponentRenderStatesEnum): TRenderComponent {
		switch (state) {
			case ComponentRenderStatesEnum.LOADING: return this._getLoadingRenderComponent()
			case ComponentRenderStatesEnum.DATA_IS_NOT_LOADED: return this._getErrorRenderComponent()

			default: return this._getRenderComponent(this.__getComponentsPropsFactory())
		}
	}

	// Hook for setting other props for component
	protected _getComponentsProps() {
		return {} as TComponentProps
	}

	// Component render component if data has received
	protected abstract _getRenderComponent(props: IAbstractComponentProps<TStateObject>): TRenderComponent

	// Error fallback
	protected abstract _getErrorRenderComponent(): TRenderComponent

	// Error fallback
	protected abstract _getLoadingRenderComponent(): TRenderComponent


	private __getComponentsPropsFactory(): IAbstractComponentProps<TStateObject> {
		return Object.assign(
			{},
			this._getComponentsProps(),
			this.__getRenderComponentProps(),
			this._presenter.getPresenterProps()
		)
	}


	private __getRenderComponentProps(): IRenderComponentProps {
		if (this.__componentRenderState === null)
			throw new Error(`CompnentRenderState is not found in ${this.constructor.name}`)

		return {
			componentMountedCallback: () => this.__componentRenderState?.setComponentState(ComponentRenderStatesEnum.IS_MOUNTED),
			componentUnMountedCallback: () => this.__componentRenderState?.setComponentState(ComponentRenderStatesEnum.IS_INNER_COMPONENT_UNMOUNTED)
		}
	}

}