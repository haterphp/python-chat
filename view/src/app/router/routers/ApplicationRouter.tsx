import { IRoute } from "../Router.state";
import { CommonRouter } from "../Router";

import Sandbox from "@pages/_sandbox/Sandbox.component";
import ChatWindow from "@pages/ChatWindow/ChatWindow.component";

export enum ApplicationRoutes {
	AUTH = 'auth',
	CHAT_WINDOW = 'chat_window',
	SANDBOX = 'sandbox'
}

class ApplicationRouter extends CommonRouter {

	constructor() {
		super(ApplicationRoutes.CHAT_WINDOW)
	}

	protected _getRoutes(): IRoute[] {
		return [
			{ routeId: ApplicationRoutes.AUTH, component: null },
			{ routeId: ApplicationRoutes.SANDBOX, component: <Sandbox/> },
			{ routeId: ApplicationRoutes.CHAT_WINDOW, component: <ChatWindow /> },
		]
	}
}

export default new ApplicationRouter()