import { State, STATE_KEY_HAS_CHANGED_EVENT_KEY } from "@shared/common/State"

export enum ComponentStatesEnum {
	IDLE = 'idle',
	LOADING = 'loading',
	IS_READY_FOR_MOUNT = 'is_ready_for_mount',
	IS_READY_FOR_UNMOUNT = 'is_ready_for_unmount',
	DATA_IS_NOT_LOADED = 'data_is_not_loaded',
}

interface IComponentStateObject {
	state: ComponentStatesEnum
}

export class ComponentState extends State<IComponentStateObject> {
	constructor() {
		super({ state: ComponentStatesEnum.IDLE })
	}

	public mount(): void {
		this._eventEmmitter.emit(STATE_KEY_HAS_CHANGED_EVENT_KEY('state'), this.getStateValue('state'))
	}

	public setComponentState (newComponentState: ComponentStatesEnum): void {
		this._setStateValue('state', () => newComponentState)
	}
}