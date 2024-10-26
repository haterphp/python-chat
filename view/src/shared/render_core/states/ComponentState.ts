import { IClassLifeCycle } from "@shared/common/Lifecycle";
import { State } from "@shared/common/state/State";
import { STATE_HAS_CHANGED_EVENT_KEY } from "@shared/common/state/StateChangesSubsriber";

export class ComponentState<TStateObject extends object> extends State<TStateObject> implements IClassLifeCycle {
	public afterMount(): void {
		this._eventEmmitter.emit(STATE_HAS_CHANGED_EVENT_KEY, this._state.object)
	}
}