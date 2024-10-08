import { IAbstractComponentProps } from "@shared/render_core/components/AbstractComponent";
import { useEffect } from "react";

// Inner react component lifecycle
interface ILifeCycleHooks {
	beforeMount?: () => void
	afterMount?: () => void
}

export const useLifeCycleComponent = (component: IAbstractComponentProps<any, any, any>, hooks?: ILifeCycleHooks): void => {
	const { componentMountedCallback, componentUnMountedCallback } = component

	useEffect(() => {
		hooks?.beforeMount?.()
		componentMountedCallback()
		hooks?.afterMount?.()

		return () => componentUnMountedCallback()
	}, [])
}