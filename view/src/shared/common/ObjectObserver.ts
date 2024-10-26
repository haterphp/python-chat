import { EventEmitter } from "./ee/EventEmitter"
import { EventEmitterSubsriber } from "./ee/EventEmitterSubsriber"

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

	public observeKey<TKey extends keyof TObject>(subscriber: EventEmitterSubsriber<TObject[TKey]>): void {
		this.__eventEmitter.subscribe(subscriber)
	}

	public unobserveKey<TKey extends keyof TObject>(subscriber: EventEmitterSubsriber<TObject[TKey]>): void {
		this.__eventEmitter.unsubscribe(subscriber)
	}
}