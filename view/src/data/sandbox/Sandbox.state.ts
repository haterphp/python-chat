import { AbstractComponentState } from "../common/components/State";

export interface ISandboxStateObject {
	data: string[]
}

export class SandboxComponentState extends AbstractComponentState<ISandboxStateObject> {}