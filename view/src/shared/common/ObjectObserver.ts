import { EventEmitter, ISubsriber } from "./EventEmitter"

export class ObjectObserver<TObject extends object = object> {
	private __object: TObject

	private __eventEmitter: EventEmitter

	constructor(object: TObject, eventEmitter: EventEmitter) {
		this.__object = object
		this.__eventEmitter = eventEmitter
	}

	public get object(): TObject {
		return this.__object
	}

	public update<TKey extends keyof TObject>(key: TKey, value: TObject[TKey]): void {
		this.__object[key] = value
		this.__eventEmitter.emit(key as string, value)
	}

	public emitKeyValue<TKey extends keyof TObject>(key: TKey) {
		this.__eventEmitter.emit(key as string, this.__object[key])
	}

	public observeKey<TKey extends keyof TObject>(key: TKey, callback: ISubsriber<TObject[TKey]>, includesValue: Array<TObject[TKey]> = []): void {
		this.__eventEmitter.subscribe(key as string, callback, includesValue)
	}

	public unobserveKey<TKey extends keyof TObject>(key: TKey, callback: ISubsriber<TObject[TKey]>): void {
		this.__eventEmitter.unsubscribe(key as string, callback)
	}
}