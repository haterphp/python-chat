import { IClassLifeCycle } from "@shared/common/Lifecycle";
import { CommonRouter } from "@shared/router/Router";
import { ReactRouterProvider } from "../router/providers/ReactRouter";

export default class Application<
	TRouter extends CommonRouter = CommonRouter,
	TComponentProvider extends ReactRouterProvider = ReactRouterProvider
> implements IClassLifeCycle {

	protected _router: TRouter

	protected _provider: TComponentProvider

	constructor(router: TRouter, provider: TComponentProvider) {
		this._router = router
		this._provider = provider
	}

	public mount(): void {
		this._router.onRouteChanged(this._provider.onRouteChange.bind(this._provider))
		this._router.mount()
	}

	public unmount(): void {
		this._router.unmount()
	}
}