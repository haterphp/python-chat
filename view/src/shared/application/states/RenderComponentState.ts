import { State, STATE_KEY_HAS_CHANGED_EVENT_KEY } from "@shared/common/State"

export enum ComponentRenderStatesEnum {
	IDLE = 'idle',
	LOADING = 'loading',
	IS_MOUNTING = 'is_mounting',
	IS_ALREADY_MOUNTED = 'is_already_mounted',
	DATA_IS_NOT_LOADED = 'data_is_not_loaded',
}

export const SHOULD_CALL_RENDER_STATES = [ComponentRenderStatesEnum.DATA_IS_NOT_LOADED, ComponentRenderStatesEnum.LOADING, ComponentRenderStatesEnum.IS_MOUNTING]

interface IComponentRenderStateObject {
	state: ComponentRenderStatesEnum
}

export const COMPONENT_ALREADY_MOUNTED = "component_already_mounted"

export class ComponentRenderState extends State<IComponentRenderStateObject> {
	constructor() {
		super({ state: ComponentRenderStatesEnum.IS_MOUNTING })
	}

	public mount(): void {
		this._eventEmmitter.emit(STATE_KEY_HAS_CHANGED_EVENT_KEY('state'), this.getStateValue('state'))
	}

	public setComponentState (newComponentState: ComponentRenderStatesEnum): void {
		console.log(newComponentState)
		this._setStateValue('state', () => newComponentState)
	}
}