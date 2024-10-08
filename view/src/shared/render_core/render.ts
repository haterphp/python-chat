import { FC } from "react";
import { AbstractComponent } from "./components/AbstractComponent";
import { ReactComponentRenderAdapter } from "./adapters/ReactComponentAdapter";

export function renderReactComponent(root: HTMLElement, component: AbstractComponent<FC, any, any, any, any>): Function {
	const adapter = new ReactComponentRenderAdapter(component)

	adapter.beforeMount(root)
	adapter.render()

	return adapter.unmount.bind(adapter)
}