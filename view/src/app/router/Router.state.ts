import { AbstractState } from "@data/common/State";
import { ReactNode } from "react";

export interface IRoute {
	routeId: string
	component: ReactNode
}

export interface IRouterStateObject {
	currentRoute: string
	routes: IRoute[]
}

export class RouterState extends AbstractState<IRouterStateObject> {
	constructor(defaultRoute: string, routes: IRoute[]) {
		super({ currentRoute: defaultRoute, routes })
	}

	public setNewCurrentRoute (route: string): void {
		this._setStateValue('currentRoute', () => route)
	}
}