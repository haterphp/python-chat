import { IAbstractComponentProps } from "@shared/application/components/AbstractComponent";
import { useEffect } from "react";
import { COMPONENT_ALREADY_MOUNTED } from "@shared/application/states/RenderComponentState";

interface ILifeCycleHooks {
	beforeMount?: () => void
	afterMount?: () => void
}

export const useLifeCycleComponent = <TStateObject extends object>(component: IAbstractComponentProps<TStateObject>, hooks?: ILifeCycleHooks): void => {
	const { emitAction } = component

	useEffect(() => {
		hooks?.beforeMount?.()
		emitAction(COMPONENT_ALREADY_MOUNTED)
		hooks?.afterMount?.()
	}, [])
}