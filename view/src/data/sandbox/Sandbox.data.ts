import { AbstractComponentData } from "../common/components/Data";
import { sleepResolve } from "../common/helpers";
import { ISandboxStateObject, SandboxComponentState } from "./Sandbox.state";

export class SandboxComponentData extends AbstractComponentData<SandboxComponentState, ISandboxStateObject> {

	public async getData(state: SandboxComponentState): Promise<void> {
		const data = await sleepResolve(2000, ['test1', 'test2', 'test3'])
		state.setStateValue('data', data)
	}

}