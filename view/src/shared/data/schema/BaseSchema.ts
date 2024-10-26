import { EventEmitter } from "@shared/common/ee/EventEmitter";
import { validate } from "class-validator";
import { SchemaObserver } from "./SchemaObserver";
import { EventEmitterSubsriber } from "@shared/common/ee/EventEmitterSubsriber";

type ExcludedKeys = 'subsribe' | 'unsubsribe' | 'update' | 'id'


export class BaseSchema<TIdentifier> {

	protected _observer: SchemaObserver<this>

	protected readonly _id: TIdentifier

	get id (): TIdentifier {
		return this._id
	}

	protected constructor(id: TIdentifier) {
		this._id = id

		this._observer = new SchemaObserver(this, new EventEmitter())
	}

	public subsribe<TKey extends keyof Omit<this, ExcludedKeys>>(subsriber: EventEmitterSubsriber<this[TKey]>): void {
		this._observer.observeKey(subsriber)
	}

	public unsubsribe<TKey extends keyof Omit<this, ExcludedKeys>>(subsriber: EventEmitterSubsriber<this[TKey]>): void {
		this._observer.unobserveKey(subsriber)
	}

	public async update<TKey extends keyof Omit<this, ExcludedKeys>>(key: TKey, value: this[TKey]): Promise<void> {
		if (['subsribe','unsubsribe','update','id'].includes(key as string)) return
		this._observer.update(key, value)
		await this.validate()
	}

	protected async validate (): Promise<void> {
		const details = await validate(this)

		if (details) {
			// console.log(details)
		}
	}
}