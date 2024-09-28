import { IRoute } from "../Router.state";
import { CommonRouter } from "../Router";
import { ReactComponentProvider } from "@shared/application/component_providers/ReactComponent.provider";
import { Presenter } from "@shared/common/Presenter";
import { State } from "@shared/common/State";
import { ChatListPresenter } from "@widgets/ChatList/model/ChatList.presenter";
import { ChatListState } from "@widgets/ChatList/model/ChatList.state";
import { ChatListData } from "@widgets/ChatList/model/ChatList.data";

export enum ApplicationRoutes {
	AUTH = 'auth',
	CHAT_WINDOW = 'chat_window',
	SANDBOX = 'sandbox'
}

const chatListPresenter = new ChatListPresenter(new ChatListState(), new ChatListData())

class ApplicationRouterClass extends CommonRouter {

		constructor() {
		super(ApplicationRoutes.CHAT_WINDOW)
	}

	protected _getRoutes(): IRoute[] {
		return [
			{ routeId: ApplicationRoutes.AUTH, component: null },
			// @ts-ignore
			{ routeId: ApplicationRoutes.CHAT_WINDOW, component: new ReactComponentProvider(chatListPresenter) },
		]
	}
}

const ApplicationRouter = new ApplicationRouterClass()

// Is enable with dev mode
// @ts-ignore
window.ApplicationRoute = ApplicationRouter

export default ApplicationRouter