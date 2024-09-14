import { DataReasons, IComponentPresenterProps, IDataComponentFabric, SendDataTransactionFn } from "./DataComponent"
import { WrappedComponentReturns } from "./Component"


interface IComponentPresenter<TData = unknown, TListenCallbackProps = any> {
	sendDataTransaction: SendDataTransactionFn<TData | TData[]>
	listenDataTransaction: SendDataTransactionFn<TListenCallbackProps>
	getRenderComponent(payload: IComponentPresenterProps): WrappedComponentReturns

	// Not supported
	bindListeners?(): void
	unbindListeners?(): void
	// Not supported
}

class ComponentWrapper<TData = unknown> {
	private __fabric: IComponentPresenter<TData>

	private __dataFabric: IDataComponentFabric<TData>

	constructor (componentFabric: IComponentPresenter<TData>, dataComponentFabric: IDataComponentFabric<TData>) {
		this.__fabric = componentFabric
		this.__dataFabric = dataComponentFabric
	}

	public async render(): Promise<WrappedComponentReturns> {
		// Load and set data to component
		const data = await this.__dataFabric.getData()

		// Render component
		return this.__fabric.getRenderComponent({
			mount: this.__componentMount(data).bind(this),
			unmount: this.__componentUnmount().bind(this),
		})
	}

	/**
	 * Life cycle hooks
	 */

	private __componentMount(data: TData[]): IComponentPresenterProps['mount']  {
		return () => {
			console.log('DEBUG: mount')
			this.__fabric.sendDataTransaction(data, DataReasons.SET)

			if (this.__dataFabric.subscribeSocket)
				this.__dataFabric.subscribeSocket(this.__fabric.sendDataTransaction.bind(this.__fabric))
		}
	}

	private __componentUnmount(): IComponentPresenterProps['unmount']  {
		return () => {
			console.log('DEBUG: unmount')

			if (this.__dataFabric.unsubscribeSocket)
				this.__dataFabric.unsubscribeSocket()
		}
	}
}

export { ComponentWrapper, type IComponentPresenter, type IDataComponentFabric, type DataReasons }