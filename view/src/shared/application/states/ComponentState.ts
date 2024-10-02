import { IClassLifeCycle } from "@shared/common/Lifecycle";
import { State, STATE_HAS_CHANGED_EVENT_KEY } from "@shared/common/State";

export class ComponentState<TStateObject extends object> extends State<TStateObject> implements IClassLifeCycle {
	public afterMount(): void {
		this._eventEmmitter.emit(STATE_HAS_CHANGED_EVENT_KEY, this.getState())
	}
}