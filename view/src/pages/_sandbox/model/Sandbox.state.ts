import { AbstractState } from "@data/common/State"

export interface ISandboxStateObject {
	data: string[]
}

export class SandboxComponentState extends AbstractState<ISandboxStateObject> {
	public setNewData(data: ISandboxStateObject['data']): void {
		this._setStateValue('data', () => data)
	}

	public pushNewItemToData(item: ISandboxStateObject['data'][number]) {
		this._setStateValue("data", (prevData) => [...prevData, item])
	}
}