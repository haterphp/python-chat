import { AbstractData } from "@data/common/Data";
import { sleepResolve } from "../../../data/common/helpers";
import { ISandboxStateObject, SandboxComponentState } from "./Sandbox.state";

export class SandboxComponentData extends AbstractData<SandboxComponentState, ISandboxStateObject> {

	public async getData(state: SandboxComponentState): Promise<void> {
		const data = await sleepResolve(2000, ['test1', 'test2', 'test3'])
		state.setNewData(data)
	}

}