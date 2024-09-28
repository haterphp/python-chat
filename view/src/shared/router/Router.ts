import { IClassLifeCycle } from "../common/Lifecycle";
import { ISubsriber } from "../common/EventEmitter";
import { IRoute, RouterState } from "./Router.state";

export abstract class CommonRouter implements IClassLifeCycle {
	protected _routerState: RouterState

	constructor(defaultRoute: string) {
		this._routerState = new RouterState(defaultRoute, this._getRoutes())
	}

	public mount(): void {
		this._routerState.mount()
	}

	public unmount(): void {
		this._routerState.unmount()
	}

	public onRouteChanged(callback: ISubsriber<IRoute | null>): void {
		this._routerState.subscribeToStateKeyChanges(
			'routeName',
			(route) => callback(this.__getCurrentRoute(route))
		)
	}

	public navigate(route: string): void {
		this._routerState.setNewCurrentRoute(route)
	}

	protected abstract _getRoutes(): IRoute[]

	private __getCurrentRoute(findingRoute: string): IRoute | null {
		const allRoutes = this._routerState.getStateValue('routes')

		for (const route of allRoutes) {
			if (route.routeId === findingRoute) return route
		}

		return null
	}
}