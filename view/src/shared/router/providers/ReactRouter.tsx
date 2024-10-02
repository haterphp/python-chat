import { IRoute } from "../Router.state";
import { createRoot, Root } from "react-dom/client";
import { Presenter } from "@shared/application/Presenter";
import { AbstractComponentProvider } from "@shared/application/AbstractComponentProvider";
import { ComponentRenderState, ComponentRenderStatesEnum, SHOULD_CALL_RENDER_STATES } from "@shared/application/states/RenderComponentState";

export class ReactRouterProvider {
	private __root: Root | null

	private __rootContainer: HTMLElement | null

	private __component: AbstractComponentProvider<Presenter> | null

	constructor (container: HTMLElement) {
		this.__rootContainer = container
		this.__root = createRoot(this.__rootContainer)
		this.__component = null
	}

	public onRouteChange (route: IRoute | null) {
		if (this.__root === null)
			throw new Error(`Root not found`)

		this.__component?.unmount()

		if (route === null)
			throw new Error(`Route ${route} not found`)

		if (route.component !== null) {
			const renderState = new ComponentRenderState()
			this.__component = route.component

			this.__component.setComponentRenderState(renderState)
			renderState.subscribeToStateKeyChanges('state', this.__renderComponentByState.bind(this))

			this.__component.mount()
		}

	}

	// TODO: Разобраться с ренедром (падает в бесконечный цикл из-за реакт компонента)
	private __renderComponentByState(state: ComponentRenderStatesEnum): void {
		if (!SHOULD_CALL_RENDER_STATES.includes(state)) return

		if (this.__component !== null && this.__root !== null) {
			const Component = this.__component.render()
			this.__root.render(<Component />)
		}
	}
}