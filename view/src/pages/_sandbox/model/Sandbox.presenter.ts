import { FC } from "react";

import SandboxRenderComponent from "@pages/_sandbox/Sandbox.render";
import { AbstractPresenter, IAbstractComponentProps } from "@data/common/components/Presenter";
import { ISandboxStateObject, SandboxComponentState } from "@pages/_sandbox/model/Sandbox.state";
import { SandboxComponentData } from "@pages/_sandbox/model/Sandbox.data";

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