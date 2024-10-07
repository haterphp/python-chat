import { IAbstractComponentProps } from "@shared/render_core/components/AbstractComponent";
import { useEffect } from "react";

// Inner react component lifecycle
interface ILifeCycleHooks {
	beforeMount?: () => void
	afterMount?: () => void
}

export const useLifeCycleComponent = <TStateObject extends object>(component: IAbstractComponentProps<TStateObject>, hooks?: ILifeCycleHooks): void => {
	const { componentMountedCallback, componentUnMountedCallback } = component

	useEffect(() => {
		hooks?.beforeMount?.()
		componentMountedCallback()
		hooks?.afterMount?.()

		return () => componentUnMountedCallback()
	}, [])
}