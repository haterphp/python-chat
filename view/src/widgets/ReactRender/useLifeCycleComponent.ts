import { IAbstractComponentProps, IComponentProps } from "@shared/Core/render_core/components/AbstractComponent";
import { useEffect } from "react";

export const useLifeCycleComponent = <
	TStateObject extends object = object,
	TComponentProps extends IComponentProps = IComponentProps,
	TEventEmitterSubscriberNames extends string = string
>(
	component: IAbstractComponentProps<TStateObject, TComponentProps, TEventEmitterSubscriberNames>,
	subscribeToChangesCallback: () => void = (() => {})
): void => {
	const { componentMountedCallback, componentUnMountedCallback } = component

	useEffect(() => {
		subscribeToChangesCallback()
		componentMountedCallback()

		return () => componentUnMountedCallback()
	}, [])
}