import { AbstractData } from "@data/common/Data";
import { sleepResolve } from "../../../data/common/helpers";
import { ISandboxStateObject, SandboxComponentState } from "./Sandbox.state";

export class SandboxComponentData extends AbstractData<SandboxComponentState, ISandboxStateObject> {

	private _interval: NodeJS.Timeout | null

	constructor() {
		super()
		this._interval = null
	}

	public async getData(state: SandboxComponentState): Promise<void> {
		const data = await sleepResolve(2000, ['test1', 'test2', 'test3'])
		state.setNewData(data)
	}

	protected _subscirbeSockets(state: SandboxComponentState): void {
		// this._interval = setInterval(state.pushNewItemToData.bind(state), 1500, 'new item')
	}

	protected _unsubscirbeSockets(): void {
		if (this._interval !== null) clearInterval(this._interval)
	}
}