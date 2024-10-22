import { EventEmitter } from "@shared/common/EventEmitter";
import { ObjectObserver } from "@shared/common/ObjectObserver";

type ValidateDataCallback = () => Promise<void>

export class SchemaObserver<TObject extends object = object> extends ObjectObserver<TObject> {

	private __validateDataCallback: ValidateDataCallback

	constructor(object: TObject, eventEmitter: EventEmitter, validateDataCallback: ValidateDataCallback) {
		super(object, eventEmitter)
		this.__validateDataCallback = validateDataCallback
	}

	public update<TKey extends keyof TObject>(key: TKey, value: TObject[TKey]): void {
		super.update(key, value)
		this.__validateDataCallback()
	}
}