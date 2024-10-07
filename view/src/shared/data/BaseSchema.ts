import { validate } from "class-validator";

export class BaseSchema<Identifier> {
	protected readonly _id: Identifier

	get id (): Identifier {
		return this._id
	}

	protected constructor(id: Identifier) {
		this._id = id
	}

	protected async validate (): Promise<void> {
		const details = await validate(this)

		if (details) {
			// console.log(details)
		}
	}
}