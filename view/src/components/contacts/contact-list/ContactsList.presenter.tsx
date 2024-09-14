import { FC } from "react";

import { ChatSchema } from "@/data/chats/schemas/ChatSchema";
import { IDataComponentFabric } from "../../common/components/DataComponent";
import { GetAllChatRequests } from "@/data/chats/requests/GetAllChatsRequest";

import MenuComponent from "./ContactsList";
import { ICommonComponentProps } from "../../common/components/Component";
import { ListComponentDataTransactionPayload, ListComponentPresenter } from "@/components/common/components/presenters/ListComponentPresenter";


class ContactsListDataComponentFabric implements IDataComponentFabric<ChatSchema> {
	public getData(): Promise<ChatSchema[]> {
		return new GetAllChatRequests().execute()
	}
}

class ContactsListComponentPresenter extends ListComponentPresenter<ChatSchema> {

	public bindListeners(): void {
		this._eventEmitter.subscribe('button_click', this.__button_click_action)
	}

	public unbindListeners(): void {
		this._eventEmitter.unsubscribe('button_click', this.__button_click_action)

		super.unbindListeners()
	}

	protected _defineRender(props: ICommonComponentProps<ListComponentDataTransactionPayload<ChatSchema>>): FC {
		return MenuComponent(props)
	}

	private __button_click_action(message: string): void {
		console.log('message: ', message)
	}

}

export {
	ContactsListDataComponentFabric,
	ContactsListComponentPresenter,
}