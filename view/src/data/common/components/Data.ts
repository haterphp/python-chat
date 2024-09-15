import { IClassLifeCycle } from "./Lifecycle";
import { AbstractComponentState } from "./State";


export abstract class AbstractComponentData<
	TState extends AbstractComponentState<TStateObject>,
	TStateObject extends object = object,
> implements IClassLifeCycle {

	public mount(state: TState): void {
		console.log('data: mount')
		if (this._subscirbeSockets) this._subscirbeSockets(state)
	}

	public unmount(): void {
		console.log('data: unmount')
		if (this._unsubscirbeSockets) this._unsubscirbeSockets()
	}

	public abstract getData(state: TState): Promise<void>

	protected _subscirbeSockets?(state: TState): void

	protected _unsubscirbeSockets?(): void
}