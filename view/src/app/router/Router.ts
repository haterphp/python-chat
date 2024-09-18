import { IClassLifeCycle } from "@data/common/components/Lifecycle";
import { ISubsriber } from "@data/common/EventEmitter";
import { IRoute, RouterState } from "./Router.state";

export abstract class CommonRouter implements IClassLifeCycle {
	protected _routerState: RouterState

	constructor(defaultRoute: string) {
		this._routerState = new RouterState(defaultRoute, this._getRoutes())
	}

	public getCurrentRoute(): IRoute['component'] {
		const currentRoute = this._routerState.getStateValue('currentRoute')
		const allRoutes = this._routerState.getStateValue('routes')

		for (const route of allRoutes) {
			if (route.routeId === currentRoute) return route.component
		}

		return null
	}

	public mount(): void {
		this._routerState.mount()
	}

	public unmount(): void {
		this._routerState.unmount()
	}

	public onRouteChanged(callback: ISubsriber<string>): void {
		this._routerState.subscribeToStateKeyChanges('currentRoute', callback)
	}

	public navigate(route: string): void {
		this._routerState.setNewCurrentRoute(route)
	}

	protected abstract _getRoutes(): IRoute[]
}