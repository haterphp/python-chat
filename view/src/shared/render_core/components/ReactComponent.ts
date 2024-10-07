import { AbstractData } from "@shared/common/Data";
import { Presenter } from "../Presenter";
import { AbstractComponent } from "./AbstractComponent";
import { ComponentState } from "../states/ComponentState";
import { FC } from "react";

export abstract class ReactComponent<
	TPresenter extends Presenter<TStateObject, TState, TData>,
	TStateObject extends object,
	TState extends ComponentState<TStateObject>,
	TData extends AbstractData<TState, TStateObject>,
> extends AbstractComponent<FC, TPresenter, TStateObject, TState, TData> {
	protected _getErrorRenderComponent(): FC {
		return () => null
	}

	protected _getLoadingRenderComponent(): FC {
		return () => null
	}
}