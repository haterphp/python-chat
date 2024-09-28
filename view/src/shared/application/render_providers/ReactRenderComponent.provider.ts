import { IRoute } from "../../router/Router.state";
import { createRoot, Root } from "react-dom/client";
import { ComponentStatesEnum } from "../ComponentState";
import { ReactComponentProvider } from "../component_providers/ReactComponent.provider";
import { Presenter } from "@shared/common/Presenter";

export class ReactRenderComponentProvider {
	private __root: Root | null

	private __rootContainer: HTMLElement | null

	private __component: ReactComponentProvider<Presenter> | null

	constructor (container: HTMLElement) {
		this.__rootContainer = container
		this.__root = createRoot(this.__rootContainer)
		this.__component = null
	}

	public onRouteChange (route: IRoute | null) {
		if (this.__root === null)
			throw new Error(`Root not found`)

		this.__component?.unmount()
		this.__root?.unmount()

		if (route === null)
			throw new Error(`Route ${route} not found`)

		if (route.component !== null) {
			this.__component = route.component

			this.__component.componentRenderState.subscribeToStateKeyChanges('state', this.__renderComponentByState.bind(this))
			this.__component.mount()
		}

	}

	private __renderComponentByState(state: ComponentStatesEnum): void {
		console.log(state)
	}
}