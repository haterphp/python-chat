import { IAbstractComponentProps } from "@shared/application/AbstractComponentProvider";
import { useEffect } from "react";
import { COMPONENT_ALREADY_MOUNTED } from "@shared/application/states/RenderComponentState";

interface ILifeCycleHooks {
	beforeMount?: () => void
	afterMount?: () => void
}

export const useLifeCycleComponent = <TStateObject extends object>(component: IAbstractComponentProps<TStateObject>, hooks?: ILifeCycleHooks): void => {
	const { emitAction } = component

	useEffect(() => {
		console.log('123')
		hooks?.beforeMount?.()
		emitAction(COMPONENT_ALREADY_MOUNTED)
		hooks?.afterMount?.()
	}, [])
}