import { Dispatch, FC, SetStateAction, useMemo, useState } from "react"
import { IComponentPresenterProps } from "./DataComponent"


interface ICommonComponentProps<TListenCallbackProps> extends IComponentPresenterProps {
	listenDataTransaction: (props: TListenCallbackProps) => void
}

type WrappedComponentReturns = ({ default: FC })

const useLoadComponentData = <TData>(props: ICommonComponentProps<{ setData: Dispatch<SetStateAction<TData[]>> }>): TData[] => {
	const [data, setData] = useState<TData[]>([])

	useMemo(() => {
		props.listenDataTransaction({ setData })
		props.mount()
		return props.unmount
	}, [])

	return data
}

export {
	useLoadComponentData,
	type ICommonComponentProps,
	type WrappedComponentReturns
}