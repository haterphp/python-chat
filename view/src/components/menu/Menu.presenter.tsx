import { Dispatch, SetStateAction } from "react";

import { ChatSchema } from "@/data/chats/schemas/ChatSchema";
import { DataReasons, IComponentPresenterProps, IDataComponentFabric } from "../common/components/DataComponent";
import { GetAllChatRequests } from "@/data/chats/requests/GetAllChatsRequest";
import { IComponentPresenter } from "../common/components/ComponentWrapper";

import MenuComponent from "./Menu.component";
import { ICommonComponentProps, WrappedComponentReturns } from "../common/components/Component";
import { EventEmitter, ISubsriber } from "../common/EventEmitter";

const UPDATE_MENU_DATA_EMIT_KEY = 'updateData'

type MenuDataDispatch = Dispatch<SetStateAction<ChatSchema[]>>

type MenuListenDataTransationPayload = { setData: MenuDataDispatch }

class MenuDataComponentFabric implements IDataComponentFabric<ChatSchema> {
	public getData(): Promise<ChatSchema[]> {
		return new GetAllChatRequests().execute()
	}
}

class MenuComponentPresenter<TProps extends ICommonComponentProps<MenuListenDataTransationPayload>> implements IComponentPresenter<ChatSchema> {

	private __otherProps?: TProps

	private __eventEmitter: EventEmitter

	constructor (otherProps?: TProps) {
		this.__otherProps = otherProps
		this.__eventEmitter = new EventEmitter()
	}

	public sendDataTransaction (data: unknown, reason: DataReasons) {
		switch (reason) {
			case DataReasons.SET:
				this.__dataBehaviorSet(data as ChatSchema[])
				break
		}
	}

	public listenDataTransaction({ setData }: MenuListenDataTransationPayload): void {
		this.__eventEmitter.subscribe(UPDATE_MENU_DATA_EMIT_KEY, setData as ISubsriber)
	}

	public getRenderComponent(payload: IComponentPresenterProps): WrappedComponentReturns {
		const props = {
			...payload,
			...(this.__otherProps ?? {}),
			listenDataTransaction: this.listenDataTransaction.bind(this)
		}
		return { default: MenuComponent(props) }
	}

	private __dataBehaviorSet(data: ChatSchema[]) {
		this.__eventEmitter.omit(UPDATE_MENU_DATA_EMIT_KEY, data)
	}

}

export {
	MenuDataComponentFabric,
	MenuComponentPresenter,
	type MenuDataDispatch,
	type MenuListenDataTransationPayload
}