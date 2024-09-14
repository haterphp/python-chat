enum DataReasons {
	SET 	= "set",
	ADD 	= "add",
	REMOVE 	= "remove",
	UPDATE 	= "update",
}

type SendDataTransactionFn<TData> = (data: TData | TData[], reason: DataReasons) => void
type ListenDataTransactionFn<TListenCallbackProps> = (props: TListenCallbackProps) => void

interface IDataComponentFabric<TData> {
	getData(): Promise<TData[]>

	subscribeSocket?(dataTransportCallback: SendDataTransactionFn<TData>): void
	unsubscribeSocket?(): void
}

export {
	DataReasons,
	type IDataComponentFabric,
	type SendDataTransactionFn,
	type ListenDataTransactionFn
}