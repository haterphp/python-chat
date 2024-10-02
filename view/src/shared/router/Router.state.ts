import { State, STATE_KEY_HAS_CHANGED_EVENT_KEY } from "../common/State";
import { Presenter } from "@shared/application/Presenter";
import { AbstractData } from "@shared/common/Data";
import { AbstractComponentProvider } from "@shared/application/AbstractComponentProvider";
import { ComponentState } from "@shared/application/states/ComponentState";

export interface IRoute<
	TStateObject extends object = object,
	TState extends ComponentState<TStateObject> = ComponentState<TStateObject>,
	TData extends AbstractData<TState, TStateObject> = AbstractData<TState, TStateObject>
> {
	routeId: string
	component: AbstractComponentProvider<Presenter<TStateObject, TState, TData>, TStateObject, TState, TData> | null
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
		this._eventEmmitter.emit(STATE_KEY_HAS_CHANGED_EVENT_KEY('routeName'), this.getStateValue('routeName'))
	}

	public setNewCurrentRoute (route: string): void {
		this._setStateValue('routeName', () => route)
	}
}