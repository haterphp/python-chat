import { IRoute } from "../Router.state";
import { CommonRouter } from "../Router";
import ChatListWidget from "@widgets/ChatList/ChatList.component";

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
			{ routeId: ApplicationRoutes.CHAT_WINDOW, component: ChatListWidget },
		]
	}
}

const ApplicationRouter = new ApplicationRouterClass()

// Is enable with dev mode
// @ts-ignore
window.ApplicationRoute = ApplicationRouter

export default ApplicationRouter