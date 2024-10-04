import { IClassLifeCycle } from "@shared/common/Lifecycle";
import { CommonRouter } from "@shared/router/Router";
import { IRoute } from "@shared/router/Router.state";

export default class Application<
	TRouter extends CommonRouter = CommonRouter,
> implements IClassLifeCycle {

	protected _router: TRouter

	protected _rootContainer: HTMLElement

	private __route: IRoute['component'] | null

	constructor(router: TRouter, rootContainer: HTMLElement) {
		this._router = router
		this._rootContainer = rootContainer

		this.__route = null
	}

	public mount(): void {
		this._router.onRouteChanged(this.__onRouteChange.bind(this))
		this._router.mount()
	}

	public unmount(): void {
		this._router.unmount()
	}

	// TODO: Add logic for umnounting components
	private __onRouteChange(route: IRoute | null): void {
		if (route === null)
			throw new Error(`Route ${route} not found`)

		console.log(route)

		this.__route?.unmount()

		this.__route = route.component
		this.__route?.mount(this._rootContainer)
	}
}