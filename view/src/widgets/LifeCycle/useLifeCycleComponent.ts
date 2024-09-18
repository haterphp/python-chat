import { IClassLifeCycle } from "@data/common/components/Lifecycle";
import { useEffect } from "react";

interface ILifeCycleHooks {
	beforeMount?: () => void
	afterMount?: () => void
}

export const useLifeCycleComponent = (component: IClassLifeCycle, hooks: ILifeCycleHooks = {}): void => {
	useEffect(() => {
		if (hooks.beforeMount !== undefined) hooks.beforeMount()
		component.mount()
		if (hooks.afterMount !== undefined) hooks.afterMount()

		return component.unmount.bind(component)
	}, [])
}