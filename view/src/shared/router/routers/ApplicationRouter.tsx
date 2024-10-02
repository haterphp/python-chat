import { IRoute } from "../Router.state";
import { CommonRouter } from "../Router";
import { ChatListPresenter } from "@widgets/ChatList/model/ChatList.presenter";
import { ChatListState } from "@widgets/ChatList/model/ChatList.state";
import { ChatListData } from "@widgets/ChatList/model/ChatList.data";
import ChatListComponent from "@widgets/ChatList/ChatList.component";

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
			{ routeId: ApplicationRoutes.CHAT_WINDOW, component: new ChatListComponent(chatListPresenter) as unknown as IRoute['component'] },
		]
	}
}

const ApplicationRouter = new ApplicationRouterClass()

// Is enable with dev mode
// @ts-ignore
window.ApplicationRoute = ApplicationRouter

export default ApplicationRouter