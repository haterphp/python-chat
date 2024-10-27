import { ReactComponent } from "@shared/Core/render_core/components/ReactComponent";
import SandboxPresenter from "./model/Sandbox.presenter";
import SandboxState from "./model/Sandbox.state";
import { IAbstractComponentProps } from "@shared/Core/render_core/components/AbstractComponent";
import { FC } from "react";
import SandboxRenderComponent from './Sandbox.render'

export default class SandboxComponent extends ReactComponent<SandboxPresenter, {}, SandboxState, any> {
	constructor() {
		super(new SandboxPresenter(new SandboxState()))
	}

	protected _getRenderComponent(props: IAbstractComponentProps<{}>): FC {
		return SandboxRenderComponent(props)
	}
}