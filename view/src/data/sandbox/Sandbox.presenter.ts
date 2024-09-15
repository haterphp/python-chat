import { FC } from "react";
import { AbstractPresenter, IAbstractComponentProps } from "../common/components/presenters/CommonPresenter";
import { SandboxComponentData } from "./Sandbox.data";
import { ISandboxStateObject, SandboxComponentState } from "./Sandbox.state";
import SandboxRenderComponent from "@/components/_sandbox/Sandbox.render";

export class SandboxComponentPresenter extends AbstractPresenter<SandboxComponentState, SandboxComponentData, ISandboxStateObject> {

	protected _getRenderComponent(props: IAbstractComponentProps): FC {
		return SandboxRenderComponent(props)
	}

}