import { FC } from "react";
import { AbstractPresenter, IAbstractComponentProps } from "../common/components/Presenter";
import { SandboxComponentData } from "./Sandbox.data";
import { ISandboxStateObject, SandboxComponentState } from "./Sandbox.state";
import SandboxRenderComponent from "@/components/_sandbox/Sandbox.render";

export class SandboxComponentPresenter extends AbstractPresenter<SandboxComponentState, SandboxComponentData, ISandboxStateObject> {

	protected _mount(): void {
		this._eventEmitter.subscribe('PUSH_NEW_ITEM_TO_DATA', this._state.pushNewItemToData.bind(this._state))
	}

	protected _unmount(): void {
		this._eventEmitter.unsubscribe('PUSH_NEW_ITEM_TO_DATA', this._state.pushNewItemToData.bind(this._state))
	}

	protected _getRenderComponent(props: IAbstractComponentProps<ISandboxStateObject>): FC {
		return SandboxRenderComponent(props)
	}
}