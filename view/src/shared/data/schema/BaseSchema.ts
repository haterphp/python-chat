import { EventEmitter } from "@shared/common/ee/EventEmitter";
import { validate } from "class-validator";
import { SchemaObserver } from "./SchemaObserver";


export class BaseSchema<Identifier> {

	public observer: SchemaObserver<this>

	protected readonly _id: Identifier

	get id (): Identifier {
		return this._id
	}

	protected constructor(id: Identifier) {
		this._id = id

		this.observer = new SchemaObserver(this, new EventEmitter(), this.validate.bind(this))
	}

	protected async validate (): Promise<void> {
		const details = await validate(this)

		if (details) {
			// console.log(details)
		}
	}
}