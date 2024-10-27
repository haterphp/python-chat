import { IClassLifeCycle } from "@shared/Core/common/Lifecycle";
import { State } from "@shared/Core/common/state/State";
import { STATE_HAS_CHANGED_EVENT_KEY } from "@shared/Core/common/state/StateChangesSubsriber";

export class ComponentState<TStateObject extends object> extends State<TStateObject> implements IClassLifeCycle {
	public afterMount(): void {
		this._eventEmmitter.emit(STATE_HAS_CHANGED_EVENT_KEY, this._state.object)
	}
}