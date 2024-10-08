import { State, STATE_KEY_HAS_CHANGED_EVENT_KEY } from "@shared/common/State"

export enum ComponentRenderStatesEnum {
	IDLE = 'idle',
	LOADING = 'loading',
	READY_FOR_MOUNTING = 'ready_for_mounting',
	MOUNTING = 'mounting',
	MOUNTED = 'mounted',
	CHILD_UNMOUNTED = 'unmounted',
	DATA_IS_NOT_LOADED = 'data_is_not_loaded',
}

export const SHOULD_CALL_RENDER_STATES = [ComponentRenderStatesEnum.DATA_IS_NOT_LOADED, ComponentRenderStatesEnum.LOADING, ComponentRenderStatesEnum.MOUNTING]

interface IComponentRenderStateObject {
	state: ComponentRenderStatesEnum
}

export class ComponentRenderState extends State<IComponentRenderStateObject> {
	constructor() {
		super({ state: ComponentRenderStatesEnum.LOADING })
	}

	public triggerRender(): void {
		this._eventEmmitter.emit(STATE_KEY_HAS_CHANGED_EVENT_KEY('state'), this.getStateValue('state'))
	}

	public setComponentState (newComponentState: ComponentRenderStatesEnum): void {
		this._setStateValue('state', () => newComponentState)
	}
}