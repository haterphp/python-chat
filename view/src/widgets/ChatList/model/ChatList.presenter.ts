import { Presenter } from "../../../shared/application/Presenter";

import { ChatListState, IChatListStateObject } from "./ChatList.state";
import { ChatListData } from "./ChatList.data";
import { ComponentRenderState } from "@shared/application/states/RenderComponentState";
import ApplicationRouter, { ApplicationRoutes } from "@shared/router/routers/ApplicationRouter";

export class ChatListPresenter extends Presenter<IChatListStateObject, ChatListState, ChatListData> {
	public mount(componentRenderState: ComponentRenderState): void {
		super.mount(componentRenderState)

		this._eventEmitter.subscribe('CALL_FROM_REACT', () => {
			ApplicationRouter.navigate(ApplicationRoutes.AUTH)
		})
	}
}