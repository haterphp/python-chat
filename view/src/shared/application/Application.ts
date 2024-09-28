import { IClassLifeCycle } from "@shared/common/Lifecycle";
import { CommonRouter } from "@shared/router/Router";
import { ReactRenderComponentProvider } from "./render_providers/ReactRenderComponent.provider";

export default class Application<
	TRouter extends CommonRouter = CommonRouter,
	TComponentProvider extends ReactRenderComponentProvider= ReactRenderComponentProvider
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