import { AbstractState, STATE_KEY_HAS_CHANGED_EVENT_KEY } from "@data/common/State";
import { ReactNode } from "react";

export interface IRoute {
	routeId: string
	component: ReactNode
	privacyPolicies?: unknown[]
}

export interface IRouterStateObject {
	routeName: string
	routes: IRoute[]
}

export class RouterState extends AbstractState<IRouterStateObject> {
	constructor(defaultRoute: string, routes: IRoute[]) {
		super({ routeName: defaultRoute, routes })
	}

	public mount(): void {
		super.mount()
		this._eventEmmitter.emit(STATE_KEY_HAS_CHANGED_EVENT_KEY('routeName'), this.getStateValue('routeName'))
	}

	public setNewCurrentRoute (route: string): void {
		this._setStateValue('routeName', () => route)
	}
}