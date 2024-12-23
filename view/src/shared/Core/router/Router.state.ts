import { AbstractComponentRenderAdapter } from "@shared/Core/render_core/adapters/AbstractComponentAdapter";
import { State } from "../common/state/State";
import { Presenter } from "@shared/Core/render_core/Presenter";

export interface IRoute {
	routeId: string
	component: AbstractComponentRenderAdapter<Presenter<any, any, any>, any, any, any, any, any> | null
	privacyPolicies?: unknown[]
}

export interface IRouterStateObject {
	routeName: string
	routes: IRoute[]
}

export class RouterState extends State<IRouterStateObject> {
	constructor(defaultRoute: string, routes: IRoute[]) {
		super({ routeName: defaultRoute, routes })
	}

	public mount(): void {
		super.mount()
		// this._eventEmmitter.emit(STATE_KEY_HAS_CHANGED_EVENT_KEY('routeName'), this.getStateValue('routeName'))
	}

	public setNewCurrentRoute (route: string): void {
		this._setStateValue('routeName', () => route)
	}
}