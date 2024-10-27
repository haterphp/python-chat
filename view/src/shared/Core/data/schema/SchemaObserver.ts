import { ObjectObserver } from "@shared/Core/common/ObjectObserver";


export class SchemaObserver<TObject extends object = object> extends ObjectObserver<TObject> {

	public update<TKey extends keyof TObject>(key: TKey, value: TObject[TKey]): void {
		// @ts-ignore
		this.object[`_${key}`] = value
		this.emitKeyValue(key)
	}
}