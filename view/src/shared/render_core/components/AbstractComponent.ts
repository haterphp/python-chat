import { IClassLifeCycle } from "@shared/common/Lifecycle";
import { IPresenterProps, Presenter } from "@shared/render_core/Presenter";
import { ComponentRenderState, ComponentRenderStatesEnum } from "../states/RenderComponentState";
import { AbstractData } from "@shared/common/Data";
import { ComponentState } from "../states/ComponentState";

export type IComponentProps = Record<string, unknown>

interface IRenderComponentProps {
	componentMountedCallback(): void
	componentUnMountedCallback(): void
}

export type IAbstractComponentProps<
	TStateObject extends object = {},
	TComponentProps extends IComponentProps = IComponentProps,
	TEventEmitterSubscriberNames extends string = string
> = TComponentProps & IPresenterProps<TStateObject, TEventEmitterSubscriberNames> & IRenderComponentProps

export abstract class AbstractComponent<
	TRenderComponent,
	TPresenter extends Presenter<TStateObject, TState, TData, TEventEmitterSubscriberNames>,
	TStateObject extends object,
	TState extends ComponentState<TStateObject>,
	TData extends AbstractData<TState, TStateObject>,
	TComponentProps extends IComponentProps = IComponentProps,
	TEventEmitterSubscriberNames extends string = string
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

	public __beforeMount(): void {
		if (this.__componentRenderState === null)
			throw new Error(`CompnentRenderState is not found in ${this.constructor.name}`)

		console.debug("DEBUG: [%s] beforeMount", this.constructor.name)

		this._presenter.__beforeMount(this.__componentRenderState.setComponentState.bind(this.__componentRenderState))
	}

	public mount(): void {
		console.debug("DEBUG: [%s] mount", this.constructor.name)

		this._presenter.mount()
	}

	public afterMount(): void {
		console.debug("DEBUG: [%s] afterMount", this.constructor.name)

		this._presenter.afterMount()
	}

	public unmount(): void {
		console.debug("DEBUG: [%s] unmount", this.constructor.name)

		this._presenter.unmount()
	}


	public getRenderComponentByState(state: ComponentRenderStatesEnum): TRenderComponent {
		switch (state) {
			case ComponentRenderStatesEnum.LOADING: return this._getLoadingRenderComponent()
			case ComponentRenderStatesEnum.DATA_IS_NOT_LOADED: return this._getErrorRenderComponent()

			default: return this._getRenderComponent(this.__getComponentsPropsFactory())
		}
	}

	// Hook for setting other props for component
	protected _getComponentsProps(): TComponentProps {
		return {} as TComponentProps
	}

	// Component render component if data has received
	protected abstract _getRenderComponent(props: IAbstractComponentProps<TStateObject, TComponentProps, TEventEmitterSubscriberNames>): TRenderComponent

	// Error fallback
	protected abstract _getErrorRenderComponent(): TRenderComponent

	// Error fallback
	protected abstract _getLoadingRenderComponent(): TRenderComponent

	private __unmountChildComponent(): void {
		console.debug("DEBUG: [%s] child component unmount", this.constructor.name)

		this._presenter.unmountChildComponent()
	}

	private __getComponentsPropsFactory(): IAbstractComponentProps<TStateObject, TComponentProps, TEventEmitterSubscriberNames> {
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
			componentMountedCallback: () => this.__componentRenderState?.setComponentState(ComponentRenderStatesEnum.MOUNTED),
			componentUnMountedCallback: this.__unmountChildComponent.bind(this)
		}
	}

}