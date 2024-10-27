import { IClassLifeCycle } from "@shared/Core/common/Lifecycle";
import { AbstractComponent } from "../components/AbstractComponent";
import { Presenter } from "../Presenter";
import { ComponentRenderState, ComponentRenderStatesEnum, IComponentRenderStateObject, SHOULD_CALL_RENDER_STATES } from "../states/RenderComponentState";
import { ComponentState } from "../states/ComponentState";
import { AbstractData } from "@shared/Core/common/Data";
import { StateKeyChangesSubsriber } from "@shared/Core/common/state/StateKeyChangesSubscriber";

export abstract class AbstractComponentRenderAdapter<
	TPresenter extends Presenter<TStateObject, TState, TData>,
	TRoot,
	TRenderComponent,
	TStateObject extends object,
	TState extends ComponentState<TStateObject>,
	TData extends AbstractData<TState, TStateObject>,
> implements IClassLifeCycle {
	private __component: AbstractComponent<TRenderComponent, TPresenter, TStateObject, TState, TData>

	private __root: TRoot | null

	private __componentRenderState: ComponentRenderState

	private __renderObserver: StateKeyChangesSubsriber<IComponentRenderStateObject, 'state'>

	private __mountObserver: StateKeyChangesSubsriber<IComponentRenderStateObject, 'state'>

	private __afterMountObserver: StateKeyChangesSubsriber<IComponentRenderStateObject, 'state'>

	constructor(component: AbstractComponent<TRenderComponent, TPresenter, TStateObject, TState, TData>) {
		this.__component = component
		this.__componentRenderState = new ComponentRenderState()

		this.__root = null

		this.__renderObserver = new StateKeyChangesSubsriber('state', this.__render.bind(this), SHOULD_CALL_RENDER_STATES)
		this.__mountObserver = new StateKeyChangesSubsriber('state', this.mount.bind(this), [ComponentRenderStatesEnum.READY_FOR_MOUNTING])
		this.__afterMountObserver = new StateKeyChangesSubsriber('state', this.afterMount.bind(this), [ComponentRenderStatesEnum.MOUNTED])
	}

	public beforeMount(rootContainer: HTMLElement): void {
		this.__root = this.__defineRoot(rootContainer)

		this.__componentRenderState.subscribeToStateKeyChanges(this.__renderObserver)
		this.__componentRenderState.subscribeToStateKeyChanges(this.__mountObserver)
		this.__componentRenderState.subscribeToStateKeyChanges(this.__afterMountObserver)

		this.__component.setComponentRenderState(this.__componentRenderState)
		this.__component.__beforeMount()
	}

	public mount(): void {
		this.__componentRenderState.mount()
		this.__component.mount()

		this.__componentRenderState.setComponentState(ComponentRenderStatesEnum.MOUNTING)
	}

	public afterMount(): void {
		this.__component.afterMount()
		this.__componentRenderState.setComponentState(ComponentRenderStatesEnum.IDLE)
	}

	public unmount(): void {
		this.__componentRenderState.unmount()
		this.__component.unmount()
	}

	public render(): void {
		this.__componentRenderState.triggerRender()
	}

	protected abstract __defineRoot(htmlElement: HTMLElement): TRoot

	protected abstract __injectToRoot(root: TRoot, component: TRenderComponent): void

	private __render(state: ComponentRenderStatesEnum): void {
		if (this.__root === null || this.__component == null) return

		const renderComponent = this.__component.getRenderComponentByState(state)
		this.__injectToRoot(this.__root, renderComponent)
	}
}