import { IClassLifeCycle } from "./Lifecycle";
import { State } from "./State";


export abstract class AbstractData<
	TState extends State<TStateObject>,
	TStateObject extends object = object,
> implements IClassLifeCycle {

	public beforeMount(state: TState): void {
		if (this._subscirbeSockets) this._subscirbeSockets(state)
	}

	public mount() {}

	public unmount(): void {
		if (this._unsubscirbeSockets) this._unsubscirbeSockets()
	}

	public abstract getData(state: TState): Promise<void>

	protected _subscirbeSockets?(state: TState): void

	protected _unsubscirbeSockets?(): void
}