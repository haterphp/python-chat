import { IClassLifeCycle } from "./components/Lifecycle";
import { AbstractState } from "./State";


export abstract class AbstractData<
	TState extends AbstractState<TStateObject>,
	TStateObject extends object = object,
> implements IClassLifeCycle {

	public mount(state: TState): void {
		if (this._subscirbeSockets) this._subscirbeSockets(state)
	}

	public unmount(): void {
		if (this._unsubscirbeSockets) this._unsubscirbeSockets()
	}

	public abstract getData(state: TState): Promise<void>

	protected _subscirbeSockets?(state: TState): void

	protected _unsubscirbeSockets?(): void
}