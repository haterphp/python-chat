import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { ListenDataTransactionFn, SendDataTransactionFn } from "./DataComponent"

interface IComponentProps {
	mount: () => void
	unmount: () => void
}

interface ICommonComponentProps<TListenCallbackProps> extends IComponentProps {
	listenDataTransaction: (props: TListenCallbackProps) => void
	emitAction(eventName: string, payload?: unknown): void
}

type WrappedComponentReturns = ({ default: FC })
type ExternalComponentProps = Record<string, any>

interface IComponentPresenter<TData = unknown, TListenCallbackProps = any> {
	sendDataTransaction: SendDataTransactionFn<TData | TData[]>
	listenDataTransaction: ListenDataTransactionFn<TListenCallbackProps>

	getRenderComponent(payload: IComponentProps): WrappedComponentReturns

	bindListeners?(): void
	unbindListeners?(): void
}

const useLoadComponentData = <TData>(props: ICommonComponentProps<{ setData: Dispatch<SetStateAction<TData[]>> }>): TData[] => {
	const [data, setData] = useState<TData[]>([])

	useEffect(() => {
		props.listenDataTransaction({ setData })
		props.mount()

		return () => {
			console.log(123)
			props.unmount()
		}
	}, [])

	return data
}

export {
	useLoadComponentData,
	type ExternalComponentProps,
	type IComponentPresenter,
	type IComponentProps,
	type ICommonComponentProps,
	type WrappedComponentReturns
}