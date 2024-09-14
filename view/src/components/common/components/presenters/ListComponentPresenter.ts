import { EventEmitter, ISubsriber } from "../../EventEmitter";
import { ExternalComponentProps, ICommonComponentProps, IComponentPresenter, IComponentProps, WrappedComponentReturns } from "../Component";
import { Dispatch, FC, SetStateAction } from "react";
import { DataReasons } from "../DataComponent";

type ListComponentDataDispatch<TData> = Dispatch<SetStateAction<TData[]>>
type ListComponentDataTransactionPayload<TData> = { setData: ListComponentDataDispatch<TData> }

const UPDATE_LIST_COMPONENT_DATA_KEY = 'loadData'


abstract class ListComponentPresenter<TData> implements IComponentPresenter<TData[]> {
	protected _externalProps: ExternalComponentProps

	protected _eventEmitter: EventEmitter

	private __setDataCallback?: ListComponentDataDispatch<TData>

	constructor (externalProps?: ExternalComponentProps) {
		this._externalProps = externalProps ?? {}
		this._eventEmitter = new EventEmitter()
	}

	public unbindListeners(): void {
		// Unsubscribe from data callback
		if (this.__setDataCallback)
			this._eventEmitter.unsubscribe(UPDATE_LIST_COMPONENT_DATA_KEY, this.__setDataCallback as ISubsriber)
	}

	public sendDataTransaction (data: unknown, reason: DataReasons) {
		switch (reason) {
			case DataReasons.SET:
				this.__dataBehaviorSet(data as TData[])
				break
		}
	}

	public listenDataTransaction({ setData }: ListComponentDataTransactionPayload<TData>): void {
		this.__setDataCallback = setData
		this._eventEmitter.subscribe(UPDATE_LIST_COMPONENT_DATA_KEY, setData as ISubsriber)
	}

	public getRenderComponent(payload: IComponentProps): WrappedComponentReturns {
		const props: ICommonComponentProps<ListComponentDataTransactionPayload<TData>> = {
			...payload,
			...(this._externalProps ?? {}),
			listenDataTransaction: this.listenDataTransaction.bind(this),
			emitAction: this._eventEmitter.emit.bind(this._eventEmitter)
		}
		return { default: this._defineRender(props) }
	}

	protected abstract _defineRender(props: ICommonComponentProps<ListComponentDataTransactionPayload<TData>>): FC

	private __dataBehaviorSet(data: TData[]) {
		this._eventEmitter.emit(UPDATE_LIST_COMPONENT_DATA_KEY, data)
	}
}

export {
	ListComponentPresenter,
	type ListComponentDataDispatch,
	type ListComponentDataTransactionPayload,
}