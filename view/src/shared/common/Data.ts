import { IClassLifeCycle } from "@shared/common/Lifecycle";
import { State } from "./State";


export abstract class AbstractData<
	TState extends State<TStateObject>,
	TStateObject extends object = object,
> implements IClassLifeCycle {

	protected _state: TState

	constructor(state: TState) {
		this._state = state
	}

	public beforeMount(): Promise<void> {
		return Promise.resolve()
	}

	public mount(): Promise<void> {
		if (this._subscirbeSockets !== undefined) this._subscirbeSockets()
		return Promise.resolve()
	}

	public unmount(): Promise<void> {
		if (this._unsubscirbeSockets !== undefined) this._unsubscirbeSockets()
		return Promise.resolve()
	}

	protected _subscirbeSockets?(): void

	protected _unsubscirbeSockets?(): void
}