import { BaseSchema } from "@shared/Core/data/schema/BaseSchema";
import { ChatMessageSchema } from "./ChatMessageSchema";

interface ICreateChatSchema {
	id: number
	name: string
}


export class ChatSchema extends BaseSchema<number> {

	protected readonly _name: string;

	protected readonly _messages: ChatMessageSchema[];

	get name(): string {
		return this._name
	}

	get messages(): ChatMessageSchema[] {
		return this._messages
	}

	protected constructor(payload: ICreateChatSchema) {
		super(payload.id)

		this._name = payload.name
		this._messages = []
	}

	public static async new(payload: ICreateChatSchema) {
		const schema = new ChatSchema(payload)
		await schema.validate()

		return schema
	}
}