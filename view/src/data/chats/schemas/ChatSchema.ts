import { BaseSchema } from "@data/common/BaseSchema";

interface ICreateChatSchema {
	id: number
	name: string
}

export class ChatSchema extends BaseSchema<number> {

	private readonly _name: string;

	get name(): string {
		return this._name
	}

	protected constructor(payload: ICreateChatSchema) {
		super(payload.id)
		this._name = payload.name
	}

	public static async new(payload: ICreateChatSchema) {
		const schema = new ChatSchema(payload)
		await schema.validate()

		return schema
	}
}