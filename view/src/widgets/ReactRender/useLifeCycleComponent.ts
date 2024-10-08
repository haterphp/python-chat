import { IAbstractComponentProps, IComponentProps } from "@shared/render_core/components/AbstractComponent";
import { useEffect } from "react";

type StateChangesListener<
	TStateObject extends object,
	TKey extends keyof TStateObject = keyof TStateObject
> = [TKey, (value: TStateObject[TKey]) => void]

export const useLifeCycleComponent = <
	TStateObject extends object = object,
	TComponentProps extends IComponentProps = IComponentProps,
	TEventEmitterSubscriberNames extends string = string
>(
	component: IAbstractComponentProps<TStateObject, TComponentProps, TEventEmitterSubscriberNames>,
	loadStateCallback: (state: TStateObject) => void = (() => {}),
	stateChangesListeners: StateChangesListener<TStateObject>[] = []
): void => {
	const { componentMountedCallback, componentUnMountedCallback, subscribeToStateChanges, subscribeToStateKeyChanges } = component

	useEffect(() => {
		subscribeToStateChanges(loadStateCallback)
		stateChangesListeners.forEach(([key, callback]) => subscribeToStateKeyChanges(key, callback))

		componentMountedCallback()

		return () => componentUnMountedCallback()
	}, [])
}