import { IClassLifeCycle } from "@shared/common/Lifecycle";
import { Presenter } from "@shared/common/Presenter";
import { FC } from "react";
import { ComponentState } from "../ComponentState";
import { State } from "@shared/common/State";
import { AbstractData } from "@shared/common/Data";

export type IComponentProps = Record<string, string | boolean | number | Function>

export class ReactComponentProvider<
	TPresenter extends Presenter,
> implements IClassLifeCycle {

	protected _presenter: TPresenter

	public componentRenderState: ComponentState

	constructor (presenter: TPresenter) {
		this._presenter = presenter
		this.componentRenderState = new ComponentState()
	}

	public mount(): void {
		this.componentRenderState.mount()
		this._presenter.mount(this.componentRenderState)
	}

	public unmount(): void {
		this.componentRenderState.unmount()
		this._presenter.unmount()
	}

	public render(): void {
		console.log('[DEBUG] Component is rendering')
	}

	// Hook for setting other props for component
	protected _getRenderComponentsProps(): IComponentProps {
		return {}
	}

	// Component render component if data has received
	// protected abstract _getRenderComponent(props: IAbstractComponentProps<TStateObject>): FC
	// protected abstract _getRenderComponent(): FC

	// Error fallback
	protected _getErrorRenderComponent(): FC {
		return () => null
	}
}