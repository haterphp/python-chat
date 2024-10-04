import { IClassLifeCycle } from "@shared/common/Lifecycle";
import { AbstractComponent } from "../components/AbstractComponent";
import { Presenter } from "../Presenter";
import { ComponentRenderState, ComponentRenderStatesEnum, SHOULD_CALL_RENDER_STATES } from "../states/RenderComponentState";
import { ComponentState } from "../states/ComponentState";
import { AbstractData } from "@shared/common/Data";

export abstract class AbstractComponentRenderAdapter<
	TPresenter extends Presenter<TStateObject, TState, TData>,
	TRoot,
	TRenderComponent,
	TStateObject extends object,
	TState extends ComponentState<TStateObject>,
	TData extends AbstractData<TState, TStateObject>,
> implements IClassLifeCycle {
	private __component: AbstractComponent<TPresenter, TRenderComponent, TStateObject, TState, TData>

	private __root: TRoot | null

	private __componentRenderState: ComponentRenderState

	constructor(component: AbstractComponent<TPresenter, TRenderComponent, TStateObject, TState, TData>) {
		this.__component = component
		this.__componentRenderState = new ComponentRenderState()

		this.__root = null
	}

	public mount(rootContainer: HTMLElement): void {
		this.__root = this.__defineRoot(rootContainer)

		this.__componentRenderState.subscribeToStateKeyChanges('state', this.__render.bind(this))
		this.__componentRenderState.mount()

		this.__component.setComponentRenderState(this.__componentRenderState)
		this.__component.mount()
	}

	public unmount(): void {
		this.__componentRenderState.unmount()
		this.__component.unmount()
	}

	protected abstract __defineRoot(htmlElement: HTMLElement): TRoot

	protected abstract __injectToRoot(root: TRoot, component: TRenderComponent): void

	private __render(state: ComponentRenderStatesEnum): void {
		if (!SHOULD_CALL_RENDER_STATES.includes(state)) return

		if (this.__root === null || this.__component == null) return

		console.log("RENDER ADAPTER: %s", state)

		const renderComponent = this.__component.getRenderComponentByState(state)
		this.__injectToRoot(this.__root, renderComponent)
	}
}