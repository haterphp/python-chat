import { IRoute } from "../Router.state";
import { CommonRouter } from "../Router";
import Sandbox from "@pages/_sandbox/Sandbox.component";
import ChatWindowPage from "@pages/ChatWindow/ChatWindow.component";

export enum ApplicationRoutes {
	AUTH = 'auth',
	CHAT_WINDOW = 'chat_window',
	SANDBOX = 'sandbox'
}

class ApplicationRouterClass extends CommonRouter {

	constructor() {
		super(ApplicationRoutes.CHAT_WINDOW)
	}

	protected _getRoutes(): IRoute[] {
		return [
			{ routeId: ApplicationRoutes.AUTH, component: null },
			{ routeId: ApplicationRoutes.SANDBOX, component: <Sandbox /> },
			{ routeId: ApplicationRoutes.CHAT_WINDOW, component: <ChatWindowPage /> },
		]
	}
}

const ApplicationRouter = new ApplicationRouterClass()

// Is enable with dev mode
// @ts-ignore
window.ApplicationRoute = ApplicationRouter

export default ApplicationRouter