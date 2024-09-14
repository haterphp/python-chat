import { DataReasons, IDataComponentFabric } from "./DataComponent"
import { WrappedComponentReturns, IComponentProps, IComponentPresenter } from "./Component"

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

	private __componentMount(data: TData[]): IComponentProps['mount']  {
		return () => {
			this.__fabric.sendDataTransaction(data, DataReasons.SET)

			if (this.__fabric.bindListeners)
				this.__fabric.bindListeners()

			if (this.__dataFabric.subscribeSocket)
				this.__dataFabric.subscribeSocket(this.__fabric.sendDataTransaction.bind(this.__fabric))
		}
	}

	private __componentUnmount(): IComponentProps['unmount']  {
		return () => {
			if (this.__fabric.unbindListeners)
				this.__fabric.unbindListeners()

			if (this.__dataFabric.unsubscribeSocket)
				this.__dataFabric.unsubscribeSocket()
		}
	}
}

export { ComponentWrapper, type IComponentPresenter, type IDataComponentFabric, type DataReasons }