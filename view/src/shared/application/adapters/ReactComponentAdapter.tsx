import { createRoot, Root } from "react-dom/client";
import { Presenter } from "../Presenter";
import { AbstractComponentRenderAdapter } from "./AbstractComponentAdapter";
import { FC } from "react";
import { ComponentState } from "../states/ComponentState";
import { AbstractData } from "@shared/common/Data";

export class ReactComponentRendereAdapter<
	TPresenter extends Presenter<TStateObject, TState, TData>,
	TStateObject extends object,
	TState extends ComponentState<TStateObject>,
	TData extends AbstractData<TState, TStateObject>,
> extends AbstractComponentRenderAdapter<TPresenter, Root, FC, TStateObject, TState, TData> {
	protected __defineRoot(htmlElement: HTMLElement): Root {
		return createRoot(htmlElement)
	}

	protected __injectToRoot(root: Root, Component: FC): void {
		root.render(<Component />)
	}
}