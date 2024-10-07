import { State, STATE_KEY_HAS_CHANGED_EVENT_KEY } from "@shared/common/State"

export enum ComponentRenderStatesEnum {
	IDLE = 'idle',
	LOADING = 'loading',
	IS_READY_FOR_MOUNTING = 'is_ready_for_mounting',
	IS_MOUNTED = 'is_mounted',
	IS_INNER_COMPONENT_UNMOUNTED = 'is_inner_unmounted',
	IS_UNMOUNTED = 'is_unmounted',
	DATA_IS_NOT_LOADED = 'data_is_not_loaded',
}

export const SHOULD_CALL_RENDER_STATES = [ComponentRenderStatesEnum.DATA_IS_NOT_LOADED, ComponentRenderStatesEnum.LOADING, ComponentRenderStatesEnum.IS_READY_FOR_MOUNTING]

interface IComponentRenderStateObject {
	state: ComponentRenderStatesEnum
}

export class ComponentRenderState extends State<IComponentRenderStateObject> {
	constructor() {
		super({ state: ComponentRenderStatesEnum.IS_READY_FOR_MOUNTING })
	}

	public triggerRender(): void {
		this._eventEmmitter.emit(STATE_KEY_HAS_CHANGED_EVENT_KEY('state'), this.getStateValue('state'))
	}

	public setComponentState (newComponentState: ComponentRenderStatesEnum): void {
		this._setStateValue('state', () => newComponentState)
	}
}